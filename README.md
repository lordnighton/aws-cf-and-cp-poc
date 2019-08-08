# AWS CloudFormation and CodePipeline PoC

## Technological stack
- AWS CloudFomation templates
  - Even an AWS CodePipeline should be created with a CloudFormation template
- EC2 on Linux AMI based on `t2.micro` instance type
- It is OK if you use EC2 instance and a security group for it that allows an SSH access
- S3 (the bucket to store uploaded images)

## Tech task
- Use 2 AWS services (`CloudFormation` and `CodePipeline`) to have a fully automated CI/CD process for an example from the 1st PoC (https://github.com/lordnighton/aws-poc-free-tier)
- I decided to get rid of the Lambda function (actually it is optional) to simplify out 2nd PoC
- The deployed application should be able to upload provided images into an S3 bucket (`S3` and `IAM roles`)
- Examples:
```
https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-cloudformation-github.html

https://blog.boltops.com/2017/03/06/a-simple-introduction-to-aws-cloudformation-part-1-ec2-instance
```