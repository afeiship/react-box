import { ReactBox } from '@jswork/react-box/src/main';
import { Card } from './components/Card';
import { Fragment } from 'react';

const View = ReactBox.withProps({ as: Card });
const FragmentView = ReactBox.withProps({ as: Fragment });

function App() {
  return (
    <div className="m-10 p-4 y-2 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <ReactBox className="debug-red">
        abc(As div)
      </ReactBox>
      <ReactBox as="a" target="_blank" href="https://js.work">JSW as anchor</ReactBox>
      <ReactBox as="img" src="https://pic.rmb.bdstatic.com/7f7a8d7b247d3aa430010f10a5765239.jpeg" alt="As image" />
      <Card description="header">Just a View</Card>
      <View footer="foooter" title="abc" description="abc">View with card</View>
      <p>
        <FragmentView>Frag</FragmentView>
      </p>
    </div>
  );
}

export default App;
