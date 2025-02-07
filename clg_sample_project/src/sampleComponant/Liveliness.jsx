import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import ResponseData from "./ResponseData";

const Liveliness = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const handleAadhaarChange = (e) => setAadhaarNumber(e.target.value);
    const handleImageUpload = (e) => setImageFile(e.target.files[0]);

    const generateOtp = () => {
        if (aadhaarNumber.length !== 12) {
            alert("Please enter a valid 12-digit Aadhaar number.");
            return;
        }
        if (!imageFile) {
            alert("Please upload the Aadhaar image first.");
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setIsWebcamActive(true);

        setTimeout(() => {
            if (webcamRef.current?.video?.readyState === 4) {
                startRecording();
            } else {
                console.warn("Webcam not ready yet, retrying...");
                setTimeout(startRecording, 1000);
            }
        }, 1000);
    };

    const startRecording = () => {
        if (!webcamRef.current || !webcamRef.current.video) {
            console.error("Webcam not initialized");
            return;
        }

        const stream = webcamRef.current.video.srcObject;
        boostAudio(stream);
        if (!stream) {
            console.error("No video stream available");
            return;
        }
        console.log("Audio Tracks:", stream.getAudioTracks());

        setIsRecording(true);

        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm;codecs=vp9,opus",
            audioBitsPerSecond: 256000,
        });
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            setVideoBlob(blob);
            setIsRecording(false);
            stopWebcam();
            alert("Video recorded successfully!");
        };

        mediaRecorder.start();
        setTimeRemaining(10);
    };

    useEffect(() => {
        let countdown;
        if (isRecording) {
            countdown = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        mediaRecorderRef.current?.stop();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [isRecording]);

    useEffect(() => {
        if (videoBlob) verifyFields();
    }, [videoBlob]);

    const verifyFields = () => {
        setIsSubmitEnabled(!!(aadhaarNumber && imageFile && videoBlob));
    };

    const stopWebcam = () => {
        if (webcamRef.current?.video?.srcObject) {
            let tracks = webcamRef.current.video.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
        }
        setIsWebcamActive(false);
    };

    const handleSubmit = async () => {
        if (!videoBlob || !imageFile || !generatedOtp) {
            alert("Please complete all steps before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", videoBlob);
        formData.append("image", imageFile);
        formData.append("actualOTP", generatedOtp);

        setIsProcessing(true);

        try {
            const response = await axios.post("http://localhost:8080/verify/video", formData);
            setResponseData(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const boostAudio = async (stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();

        gainNode.gain.value = 3;

        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
    };


    return (
        <div style={styles.container}>
            <div style={styles.leftContainer}>
                <h2 style={styles.heading}>Video OTP Verification</h2>
    
                <label style={styles.label}>Aadhaar Number:</label>
                <input
                    type="number"
                    value={aadhaarNumber}
                    onChange={handleAadhaarChange}
                    style={styles.input}
                    maxLength="12"
                    required
                />
    
                <label style={styles.label}>Upload Aadhaar Image:</label>
                <input
                    type="file"
                    accept="image/jpeg"
                    onChange={handleImageUpload}
                    style={styles.input}
                    required
                />
    
                {generatedOtp && <h4 style={styles.otp}>Generated OTP: {generatedOtp}</h4>}
    
                <button
                    onClick={generateOtp}
                    disabled={isRecording}
                    style={styles.button}
                >
                    Generate OTP and Start Video Recording
                </button>
    
                {isWebcamActive && (
                    <Webcam
                        ref={webcamRef}
                        audio
                        style={styles.webcam}
                        videoConstraints={{
                            width: 1080,
                            height: 720,
                            facingMode: "user",
                        }}
                        audioConstraints={{
                            echoCancellation: false,
                            noiseSuppression: true,
                            autoGainControl: false,
                            sampleRate: 48000,
                        }}
                    />
                )}
    
                {isRecording && (
                    <p style={styles.recording}>Recording... Time remaining: {timeRemaining}s</p>
                )}
    
                <button
                    onClick={handleSubmit}
                    disabled={!isSubmitEnabled || isProcessing}
                    style={styles.button}
                >
                    {isProcessing ? "Processing..." : "Submit"}
                </button>
            </div>
    
      
            <div
    style={{
        ...styles.rightContainer,
        ...(responseData ? styles.rightContainerVisible : {}),
    }}
>
    <ResponseData data={responseData} />
</div>

        </div>
    );
    

};

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between", 
        flexWrap: "wrap", 
        maxWidth: "1000px",  
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
    },
    leftContainer: {
        width: "48%",  
        textAlign: "center",
        marginBottom: "20px", 
    },
    rightContainer: {
        width: "48%", 
        textAlign: "center",
        display: "none",  // Hidden by default
        opacity: 0, // Initially invisible
        transition: "opacity 0.5s ease-in-out", // Smooth fade-in effect
    },
    rightContainerVisible: {
        display: "block", // Make it visible when data exists
        opacity: 1, // Make it fully visible
        animation: "slideIn 0.5s ease-out forwards", // Sliding animation
    },
    heading: {
        marginBottom: "15px",
        color: "#333",
    },
    label: {
        display: "block",
        margin: "10px 0 5px",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "8px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "1px solid #ddd",
    },
    otp: {
        fontWeight: "bold",
        color: "#007BFF",
    },
    button: {
        backgroundColor: "#007BFF",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
        width: "100%",
    },
    webcam: {
        width: "100%",
        marginTop: "15px",
    },
    recording: {
        fontWeight: "bold",
        color: "red",
    },

   
    "@keyframes slideIn": {
        "0%": {
            transform: "translateX(100%)",  
            opacity: 0,
        },
        "100%": {
            transform: "translateX(0)", 
            opacity: 1,
        },
    },

   
    "@media (max-width: 768px)": {
        container: {
            flexDirection: "column", 
        },
        leftContainer: {
            width: "100%",  
            marginBottom: "20px",  
        },
        rightContainer: {
            width: "100%", 
            marginLeft: "0", 
        },
    },

    "@media (max-width: 480px)": {
        heading: {
            fontSize: "1.2rem",  
        },
        button: {
            padding: "12px",  
        },
        input: {
            padding: "10px",  
        },
    },
};



export default Liveliness;
