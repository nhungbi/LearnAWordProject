import { TypeAnimation } from 'react-type-animation';

function TypeCuppy (){
    return (
      <TypeAnimation
        sequence={[
          'Cuppy', 2000, 'Cuppy, Cuppy', 2500,
          'Cuppy, Cuppy, Cuppy!',
          3000,  // Waits 5s
         
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        style={{ color: 'rgb(79, 81, 101)', fontWeight: 'bolder', textAlign: 'center', fontSize: '3em' }}
      />
    );
  };

  export default TypeCuppy