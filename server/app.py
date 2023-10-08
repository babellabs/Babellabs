from flask import Flask, request, jsonify
import streamlit as st
from pytube import YouTube
from pydub import AudioSegment
import pandas as pd
import whisper
import openai
import io
import os
from elevenlabs import generate, set_api_key
import subprocess
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip

api_key = st.secrets["YOUR_OPENAI_API_KEY"]
xi_api_key = st.secrets["xi_api_key"]

def shorten_audio(input_filename):
    output_filename = "cut_audio.mp4"
    audio = AudioSegment.from_file(input_filename)
    cut_audio = audio[:60 * 1000]
    cut_audio.export(output_filename, format="mp4")
    return output_filename

def generate_translation(original_text, destination_language):
    prompt = (
        "Translate the following video transcript into " + destination_language +
        ". You will see the translation immediately after the prompt 'The translation is:'"
        "The transcript is as follows: " + original_text +
        "The translation is:"
    )

    # Use your OpenAI API key here

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1500,
        n=1,
        # stop=None,
        # temperature=0.7,
        api_key=api_key
    )

    translation = response.choices[0].text
    return translation

def generate_dubs(text):
    filename = "output.mp3"

    set_api_key(xi_api_key)

    audio = generate(
        text=text,
        voice="Antoni",
        model='eleven_multilingual_v1'
    )

    audio_io = io.BytesIO(audio)
    insert_audio = AudioSegment.from_file(audio_io, format='mp3')
    insert_audio.export(filename, format="mp3")

    return filename

def combine_video(video_filename, audio_filename):
    ffmpeg_extract_subclip(video_filename, 0, 60, targetname="cut_video.mp4")
    output_filename = "output.mp4"
    command = ["ffmpeg", "-y", "-i", "cut_video.mp4", "-i", audio_filename, "-c:v", "copy", "-c:a", "aac", output_filename]
    subprocess.run(command)
    return output_filename

app = Flask(__name)

@app.route('/dub-video', methods=['POST'])
def dub_video():
    youtube_url = request.json['youtube_url']
    yt = YouTube(youtube_url)

    if yt is not None:
        audio_streams = yt.streams.filter(only_audio=True)
        filename = audio_streams.first().download()

        if filename:
            cut_audio = shorten_audio(filename)
            model = whisper.load_model("base")
            transcription = model.transcribe(cut_audio)

            if transcription:
                translation = generate_translation(transcription, "Hindi")  # Change language as needed
                dubs_audio = generate_dubs(translation)

                video_streams = yt.streams.filter(only_video=True)
                video_filename = video_streams.first().download()

                if video_filename:
                    output_filename = combine_video(video_filename, dubs_audio)
                    return jsonify({"dubbed_video": output_filename})

    return jsonify({"error": "An error occurred"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
