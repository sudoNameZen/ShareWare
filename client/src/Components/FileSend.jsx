import React, { useState, useEffect } from 'react';
import socket from '../provider/socket';
import { Send, File, UserPlus } from 'lucide-react';

const peerConnection = new RTCPeerConnection({
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun.l.google.com:5349",
                "stun:stun1.l.google.com:3478"
            ]
        }
    ]
});

const FileSender = () => {
    const [targetId, setTargetId] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const sendFile = async () => {
        if (!file) return alert('Please select a file first!');
        socket.emit('transfer-start', { target: targetId, fileName: file.name, fileSize: file.size, fileType: file.type });

        const dataChannel = peerConnection.createDataChannel('file');
        const CHUNK_SIZE = 16 * 1024;

        dataChannel.onopen = () => {
            let offset = 0;
            dataChannel.send(JSON.stringify({ type: 'metadata', fileName: file.name, fileType: file.type, fileSize: file.size }));
            const reader = new FileReader();

            reader.onload = () => {
                if (dataChannel.readyState === 'open') {
                    dataChannel.send(reader.result);
                    offset += CHUNK_SIZE;
                    if (offset < file.size) {
                        readNextChunk();
                    } else {
                        dataChannel.send(JSON.stringify({ type: 'Sent' }));
                    }
                }
            };

            const readNextChunk = () => {
                const slice = file.slice(offset, offset + CHUNK_SIZE);
                reader.readAsArrayBuffer(slice);
            };

            readNextChunk();
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', { target: targetId, offer });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { target: targetId, candidate: event.candidate });
            }
        };
    };

    useEffect(() => {
        const handleAnswer = async (data) => {
            await peerConnection.setRemoteDescription(data.answer);
        };
        const handleIceCandidate = (data) => {
            peerConnection.addIceCandidate(data.candidate);
        };

        socket.on('answer', handleAnswer);
        socket.on('ice-candidate', handleIceCandidate);

        return () => {
            socket.off('answer', handleAnswer);
            socket.off('ice-candidate', handleIceCandidate);
        };
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server with ID:', socket.id);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
            <div className="bg-gray-800/70 backdrop-blur-md shadow-lg p-8 rounded-2xl w-full max-w-2xl text-center">
                <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Send Your Files</h2>

                <div className="mb-6">
                    <label className="flex items-center gap-2 text-lg font-medium mb-2">
                        <UserPlus className="w-5 h-5" /> Target Peer ID
                    </label>
                    <input
                        type="text"
                        placeholder="Enter target peer ID"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-purple-600 focus:outline-none"
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="flex items-center gap-2 text-lg font-medium mb-2">
                        <File className="w-5 h-5" /> Choose a File
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full file:px-4 file:py-2 file:rounded-lg file:bg-purple-500 file:text-white file:border-none bg-gray-700 text-gray-300 rounded-lg"
                    />
                </div>

                <button
                    onClick={sendFile}
                    className="mt-4 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                    <Send className="w-5 h-5" /> Send File
                </button>
            </div>
        </div>
    );
};

export default FileSender;