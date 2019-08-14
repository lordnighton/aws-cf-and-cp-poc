export PATH=/Users/lordnighton/Library/Python/3.7/bin:$PATH
# validate the template
aws cloudformation validate-template --template-body file://cf-stack.yml

aws cloudformation create-stack --template-body file://cf-stack.yml --stack-name single-instance-with-security-group --parameters ParameterKey=KeyName,ParameterValue=SSHKeys --capabilities CAPABILITY_IAM

# Create a new key pair --> taken from https://docs.aws.amazon.com/cli/latest/reference/ec2/create-key-pair.html
# Generate the keys manually !
# aws --region us-east-1 ec2 create-key-pair --key-name "KeyPair"
chmod 400 SSHKeys.pem
# show the SSH key
aws ec2 describe-key-pairs --key-name SSHKeys

# Cleanup the stack
aws cloudformation delete-stack --stack-name single-instance-with-security-group

#SSH connect
ssh -i ./SSHKeys.pem ec2-user@ec2-52-23-211-143.compute-1.amazonaws.com

# Install Node JS
nvm install 4.4

# Start the application and look into it 
npm start
// go to localhost:9001

# Cleanup
npm run clean

#EC2 user data (should NOT start form sudo)
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_6.x | sudo -E bash -
yum install -y nodejs 6.17.1
yum install -y git
git clone https://github.com/lordnighton/aws-cf-and-cp-poc.git
cd aws-cf-and-cp-poc
npm install
npm start