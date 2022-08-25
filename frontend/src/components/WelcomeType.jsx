import { TypeAnimation } from 'react-type-animation';

function WelcomeType ({user, number}){
    return (
      <TypeAnimation
        sequence={[
          'Hello.', 
          1500, // Waits 1.5s
          `Welcome ${user.username}!`,
          3000, // Waits 3s
          `Total learned: ${number}`,
          3000,
          'Ready to learn?',
          3000,
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        style={{ color: '#00143F', fontSize: '2em' }}
      />
    );
  };

  export default WelcomeType