import { ReactBox, createReactBoxVariant } from '@jswork/react-box/src/main';
import { Card } from './components/Card';
import withProps from '@jswork/with-props';

// 方法1: 使用 createReactBoxVariant（类型精确）
const View = createReactBoxVariant(Card);

// 方法2: 使用 withProps
const View2 = withProps(Card, {});

// 方法3: 使用 ReactBox.createVariant
const View3 = ReactBox.createVariant(Card);

function App() {
  return (
    <div className="m-10 p-4 y-2 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <ReactBox className="debug-red">
        abc(As div)
      </ReactBox>
      <ReactBox as="input" type="search" placeholder="search..." />
      <ReactBox as="a" target="_blank" href="https://js.work">JSW as anchor</ReactBox>
      <ReactBox as="img" src="https://pic.rmb.bdstatic.com/7f7a8d7b247d3aa430010f10a5765239.jpeg" alt="As image" />
      <Card description="xxx">Just a View</Card>
      <ReactBox as={Card} description="xxx">
        Test card
      </ReactBox>
      <View description="xyz" title="xxx">xx</View>
      {/*<p>*/}
      {/*  <FragmentView>Frag</FragmentView>*/}
      {/*</p>*/}
    </div>
  );
}

export default App;
