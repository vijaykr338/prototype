import { useSearchParams } from 'react-router-dom';

function Callback() {
  console.log('Callback component rendered');
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log('Code:', code);
  console.log('State:', state);

  return (
    <div>
      <h2>Callback Component</h2>
      <p>Code: {code}</p>
      <p>State: {state}</p>
    </div>
  );
}

export default Callback;