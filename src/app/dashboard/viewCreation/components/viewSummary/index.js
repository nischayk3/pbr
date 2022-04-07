import { Card, Empty } from 'antd';
const ViewSummaryData = () => {
  return (
    <Card title='View Summary'>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='You will see the created fucntions here'
      />
    </Card>
  );
};

export default ViewSummaryData;
