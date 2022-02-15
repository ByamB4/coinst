import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')


# def upload_my_file(bucket, folder, file_name, file_binary_data):
#     if file_binary_data is None:
#         file_binary_data = bytearray("No Data", "utf8")

#     key = folder+"/"+file_name
#     try:
#         s3_client.put_object(Bucket=bucket, Key=key, Body=file_binary_data)
#     except ClientError as e:
#         print(e)
#         return False
#     return True


# file_data = "This is a file data example"

# file_binary_data = bytearray(file_data, "utf8")

s3_client.upload_file(
    'README.md',
    'coinst-story',
    'themunkhjin/README.md'
)
# res = s3_client.list_objects(
#     Bucket='coinst-story', Prefix='themunkhjin/', Delimiter='/')

# fileNames = []

# for _ in res.get('Contents')[1:]:
#     fileNames.append(_.get('Key')[len('themunkhjin/'):])

# print(fil)
