FROM public.ecr.aws/lambda/python:3.12

# Install basic system dependencies
RUN dnf update -y && \
    dnf install -y \
    gcc \
    gcc-c++ \
    python3-devel \
    atlas \
    lapack \
    blas \
    openblas \
    libffi-devel \
    wget \
    tar \
    xz

# Install static FFmpeg binaries
RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz && \
    tar xvf ffmpeg-release-amd64-static.tar.xz && \
    mv ffmpeg-*-amd64-static/ffmpeg /usr/local/bin/ && \
    mv ffmpeg-*-amd64-static/ffprobe /usr/local/bin/ && \
    rm -rf ffmpeg-*-amd64-static* && \
    chmod +x /usr/local/bin/ffmpeg && \
    chmod +x /usr/local/bin/ffprobe

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install Python packages
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy function code
COPY process_video.py ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler
CMD [ "process_video.lambda_handler" ]