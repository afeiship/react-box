import { ReactBox } from '@jswork/react-box';
import { Card } from './components/Card';

// Test: Check what props are available
const test = () => {
  return (
    <ReactBox as={Card} title="test" description="desc">
      Content
    </ReactBox>
  );
};

export default test;
