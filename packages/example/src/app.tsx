import { ReactBox } from '@jswork/react-box/src/main';
import { Card } from './components/Card';

function App() {
  return (
    <div className="m-10 p-4 y-2 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <ReactBox className="debug-red">
        abc(As div)
      </ReactBox>
      <ReactBox as="input" type="search" placeholder="search..." />
      <ReactBox as="a" target="_blank" href="https://js.work">JSW as anchor</ReactBox>
      <ReactBox as="img" alt="a" src="https://tva1.js.work/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg" />
      <Card description="xxx">Just a View</Card>
      <ReactBox as={Card} description="xxx" footer="I am footer" title="card title">
        Test card
      </ReactBox>
      {/*<p>*/}
      {/*  <FragmentView>Frag</FragmentView>*/}
      {/*</p>*/}
    </div>
  );
}

export default App;
