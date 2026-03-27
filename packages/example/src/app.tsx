import { ReactBox } from '@jswork/react-box/src/main';
import { Card } from './components/Card';

const View = ReactBox.withProps({ as: Card });

function App() {
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <ReactBox className="debug-red">
        abc(As div)
      </ReactBox>
      <ReactBox as="a" target="_blank" href="https://js.work">JSW as anchor</ReactBox>
      <ReactBox as="img" src="https://pic.rmb.bdstatic.com/7f7a8d7b247d3aa430010f10a5765239.jpeg" alt="As image" />
      <View>Just a View</View>
    </div>
  );
}

export default App;
