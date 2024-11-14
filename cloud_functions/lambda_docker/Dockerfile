FROM public.ecr.aws/lambda/python:3.11

# Install gcc and required build tools
RUN yum groupinstall -y "Development Tools"
RUN yum install -y \
    gcc \
    gcc-c++ \
    make \
    python3-devel \
    atlas-devel \
    libffi-devel

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install numpy first as it's often a base requirement
RUN pip install numpy

# Try installing vitallens with all dependencies
RUN pip install vitallens[all]

# Copy only the process_video lambda file
COPY process_video.py ${LAMBDA_TASK_ROOT}/

# Set the CMD to point to process_video.lambda_handler
CMD [ "process_video.lambda_handler" ]