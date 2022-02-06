import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Popconfirm, Space, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ColumnsType } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import MyUpload from "../../components/MyUpload";
import {
  loadModelsAPI,
  delById,
  insertModel,
  modifyById,
} from "../../services/product-categories";
import { dalImg } from "../../utils/tools";

function Categories() {
  const [list, setList] = useState<IProductData.Category[]>();
  const [total, setTotal] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  const [isShow, setIsShow] = useState(false);
  const [query, setQuery] = useState({}); // query是一个查询条件, name page
  const [editForm] = Form.useForm();
  const [currentId, setCurrentId] = useState(-1); // 当前id，如果是-1表示新增，否则表示修改
  const [imageUrl, setImageUrl] = useState("");

  // useEffect(() => {
  //   loadModelsAPI(query) => {
  //     setList(res.data);
  //     setTotal(res.total);
  //   });
  // }, [query]);
  useEffect(() => {
    if (!isShow) {
      setImageUrl("");
    }
  }, [isShow]);

  const columns: ColumnsType<IProductData.Category> = [
    {
      title: "序号",
      render(d: any, r: any, i: number) {
        return i + 1;
      },
      align: "center",
      width: 80,
    },
    {
      title: "名字",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "描述",
      align: "center",
      dataIndex: "desc",
    },
    {
      title: "主图",
      align: "center",
      render(v: IProductData.Category) {
        return (
          <img
            style={{ width: "100px", maxHeight: "120px" }}
            alt={v.name}
            src={dalImg(v.coverImage)}
          />
        );
      },
    },
    {
      title: "操作",
      align: "center",
      width: 120,
      render(v: IProductData.Category) {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentId(v.id as number);
                setIsShow(true);
                setImageUrl(v.coverImage as string); // 设置一下当前主图的图片
                editForm.setFieldsValue(v); // 设置表单的数据
              }}
            />
            <Popconfirm
              title="是否确认删除此项"
              okText="是"
              cancelText="否"
              onConfirm={async () => {
                // 调接口
                await delById(v.id + "");
                setQuery({}); // 重置查询条件
              }}
            >
              <Button type="primary" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Card
      title="商品分类"
      extra={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsShow(true);
            }}
          ></Button>
        </>
      }
    >
      <Form
        layout="inline"
        onFinish={(v) => {
          setQuery({ page: 1, ...v });
        }}
      >
        <Form.Item name="name" label="名字">
          <Input placeholder="请输入名字" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        bordered={true}
        dataSource={list}
        columns={columns}
        pagination={{
          total,
          showSizeChanger: false,
          onChange(page) {
            setQuery({ ...query, page });
          },
        }}
      />
      <Modal
        visible={isShow}
        onCancel={() => {
          editForm.resetFields();
          setIsShow(false);
        }}
        maskClosable={false}
        getContainer={false}
        title="编辑"
        okText="确定"
        cancelText="取消"
        onOk={() => {
          // 提交表单
          editForm.submit(); // 触发表单的提交事件
        }}
      >
        <Form
          labelCol={{ span: 3 }}
          form={editForm}
          onFinish={async (v) => {
            // 此处判断是新增还是修改，调接口就行
            if (currentId > -1) {
              await modifyById(currentId + "", { ...v, coverImage: imageUrl });
            } else {
              // 新增
              await insertModel({ ...v, coverImage: imageUrl });
            }
            editForm.resetFields();
            setIsShow(false);
            setCurrentId(-1);
            setQuery({}); // 重置查询条件，数据重新加载
          }}
        >
          <Form.Item
            label="名字"
            name="name"
            rules={[{ required: true, message: "名字不能为空" }]}
          >
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
          <Form.Item label="主图">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Categories;
