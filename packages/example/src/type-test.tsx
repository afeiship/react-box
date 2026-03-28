import { ReactBox } from '@jswork/react-box';
import { Card } from './components/Card';

// Test 1: Direct usage with Card component
const test1 = (
  <ReactBox as={Card} description="test">
    Content
  </ReactBox>
);

// Test 2: Using withProps
const View = ReactBox.withProps({ as: Card });
const test2 = (
  <View description="test" title="title">
    Content
  </View>
);

export { test1, test2 };
