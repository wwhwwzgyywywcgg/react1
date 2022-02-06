import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { ColumnsType } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import MyUpload from "../../components/MyUpload";
import {
  loadModelsAPI,
  delById,
  insertModel,
  modifyById,
  // loadModelById,
} from "../../services/product-categories";
import { loadModelsAPI as loadCategories } from "../../services/product-categories";
import { dalImg } from "../../utils/tools";

function Products() {
  // useState的时候可以为数据设置初始数据类型
  const [list, setList] = useState<IProductData.Product[]>();
  const [total, setTotal] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState({}); // query是一个查询条件, name page
  const [isShow, setIsShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentId, setCurrentId] = useState(-1);
  const [categories, setCategories] = useState<IProductData.Category[]>([]); // 商品分类

  const [editForm] = Form.useForm();
  useEffect(() => {
    loadCategories({ per: 1000 }).then((res) => {
      setCategories(res.data);
    });
  }, []);
  useEffect(() => {
    loadModelsAPI(query).then((res) => {
      setList(res.data);
      setTotal(res.total);
    });
  }, [query]);
  useEffect(() => {
    if (!isShow) {
      setImageUrl("");
      setCurrentId(-1);
      setQuery({});
    }
  }, [isShow]);
  const columns: ColumnsType<IProductData.Product> = [
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
      title: "分类",
      align: "center",
      render(v: IProductData.Product) {
        return v.category?.name || "暂无";
      },
    },
    {
      title: "主图",
      align: "center",
      render(v: IProductData.Product) {
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
      title: "价格",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "库存",
      dataIndex: "amount",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      width: 120,
      render(v: IProductData.Product) {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={async () => {
                // const res = await loadModelById(v.id + "");
                setIsShow(true); // 弹窗
                setCurrentId(v.id as number); // 设置当前id，修改操作的标识位
                // console.log(res);
                editForm.setFieldsValue({ ...res, category: res.category?.id }); // 初始化表单的数据
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
      title="商品信息"
      extra={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsShow(true)}
          />
        </>
      }
    >
      <Form
        layout="inline"
        onFinish={(v) => {
          setQuery({ page: 1, ...v });
        }}
      >
        <Form.Item name="name" label="商品名字">
          <Input placeholder="请输入商品名字" />
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
        title="编辑"
        visible={isShow}
        onCancel={() => setIsShow(false)}
        maskClosable={false}
        destroyOnClose={true}
        cancelText="取消"
        okText="确定"
        onOk={() => {
          editForm.submit(); // 触发表单的提交
        }}
      >
        <Form
          form={editForm}
          preserve={false}
          labelCol={{ span: 3 }}
          onFinish={async (v) => {
            if (currentId > -1) {
              await modifyById(currentId + "", { ...v, coverImage: imageUrl });
            } else {
              await insertModel({ ...v, coverImage: imageUrl });
            }
            setIsShow(false);
          }}
        >
          <Form.Item
            label="名字"
            name="name"
            rules={[{ required: true, message: "商品名字不能为空" }]}
          >
            <Input placeholder="请输入商品名字" />
          </Form.Item>
          <Form.Item name="category" label="商品分类">
            <Select>
              {categories.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="主图">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item label="价格" name="price">
            <InputNumber
              prefix="￥"
              placeholder="请输入商品价格"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="库存" name="amount">
            <InputNumber
              placeholder="请输入商品库存"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Products;
