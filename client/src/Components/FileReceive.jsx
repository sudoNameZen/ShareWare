import React, { useEffect, useState, useRef } from 'react';
import { AlertTriangle, DownloadCloud } from 'lucide-react';
import socket from '../provider/socket';

const peerConnection = new RTCPeerConnection();

const FileReceiver = () => {
  const [peerId, setPeerId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [fileName, setFileName] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('Waiting for file...');
  const [progress, setProgress] = useState(0);

  const fileSizeRef = useRef(0);
  const bytesReceivedRef = useRef(0);
  const receivedChunks = useRef([]);
  const isDownloading = useRef(false);
  const fileNameRef = useRef('');

  useEffect(() => {
    if (socket.connected) setPeerId(socket.id);
    socket.on('connect', () => setPeerId(socket.id));

    socket.on('offer', async ({ sender, offer }) => {
      setSenderId(sender);
      setDownloadStatus('Receiving...');

      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', { target: sender, answer });
    });

    socket.on('ice-candidate', ({ candidate }) => {
      peerConnection.addIceCandidate(candidate);
    });

    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
      receivedChunks.current = [];
      bytesReceivedRef.current = 0;
      isDownloading.current = false;
      setProgress(0);

      dataChannel.onmessage = (event) => {
        const data = event.data;

        // Metadata
        if (typeof data === 'string') {
          try {
            const meta = JSON.parse(data);
            if (meta.type === 'metadata') {
              fileSizeRef.current = meta.fileSize;
              setFileName(meta.fileName);
              fileNameRef.current = meta.fileName;
              setDownloadStatus('Receiving...');
            } else if (meta.type === 'Sent' && !isDownloading.current) {
              // Complete download
              const blob = new Blob(receivedChunks.current);
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = fileNameRef.current || 'file';
              link.click();
              isDownloading.current = true;
              setDownloadStatus('Completed');
              setProgress(1);
            }
          } catch (err) {
            console.error('Error parsing data string', err);
          }

        } else {
          // Binary chunk
          receivedChunks.current.push(data);
          bytesReceivedRef.current += data.byteLength;
          setProgress(bytesReceivedRef.current / fileSizeRef.current);
        }
      };
    };

    return () => {
      socket.off('connect');
      socket.off('offer');
      socket.off('ice-candidate');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-lg text-white">
        <div className="flex flex-col items-center mb-6">
          <AlertTriangle className="w-12 h-12 text-orange-500 animate-pulse" />
          <h2 className="text-2xl font-bold mt-4">Receive File</h2>
          <p className="text-sm text-gray-400 mt-2">Your Peer ID: <span className="font-mono text-orange-400">{peerId || 'Connecting...'}</span></p>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-lg font-medium mb-2">
            <DownloadCloud className="w-5 h-5 text-gray-300" />
            File Status
          </label>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${Math.floor(progress * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-300">
            {downloadStatus}{fileName ? `: ${fileName}` : ''}
          </p>
          {progress > 0 && progress < 1 && (
            <p className="text-sm text-gray-400 mt-1">{Math.floor(progress * 100)}% completed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileReceiver; 