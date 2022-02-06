import { useState, memo } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadUrl, dalImg } from "../utils/tools";
import { UploadChangeParam } from "antd/lib/upload/interface";

// function getBase64(img: any, callback: any) {
//   const reader = new FileReader(); // FileReader是js内置的API，作用是读取文件数据
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img); // readAsDataURL 这个方法的作用是把文件转换为base64编码的字符串
// }

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

type MyUploadProp = {
  imageUrl: string;
  setImageUrl: any;
};
function MyUpload({ imageUrl, setImageUrl }: MyUploadProp) {
  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState("");
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      //
      // console.log(info);
      setLoading(false);
      setImageUrl(info.file.response.data);
      // setImageUrl // 改变图片路径
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      // name 表示服务器端接口接收到的数据的属性名
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={uploadUrl}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={dalImg(imageUrl)} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}

export default memo(MyUpload);
