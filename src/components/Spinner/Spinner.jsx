import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const Spinner = () => (
  <>
    {/* <Spin indicator={<LoadingOutlined spin />} size="large" /> */}
      <Spin style={{margin: 'auto'}}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 68,
            }}
            spin
          />
        }
      />
  </>
);

export default Spinner;
