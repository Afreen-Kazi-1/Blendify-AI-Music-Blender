## This folder contains notebooks for processing audio and automating the whole workflow.

Steps: 
1. Extracting audio in mp3 or wav format from Youtube url.
2. Separate into 2 stems: vocals and accompaniments using Spleeter with subprocess in python.
3. Divide the songs into <i> n </i> sections based on onset and chroma features using Librosa.
4. Analyze the song sections to calculate tempo, bass, pitch and other audio features using Librosa.
5. Calculate rhythmic and harmonic compatibility and spectral balance using AutoMashUpper Research Paper and thereby calculate Mashability/ Blendability.
6. Make <i> n(n+1)/2 </i> comparisons to find the top <i> n </i> sections out of <i> 2n </i> sections.
7. Use timesharing and pitchshifting to make sections blendable and combine sections using pydub and ffmpeg.
8. Export the newly made song. 
