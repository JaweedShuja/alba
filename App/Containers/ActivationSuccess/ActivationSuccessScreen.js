import ActivationSuccess from 'App/Components/Home/ActivationSuccess';
import React from 'react';
import Container from '../../Components/Container';
const ActivationSuccessScreen = ({navigation}) => {
  return (
    <Container {...{navigation}}>
      <ActivationSuccess />
    </Container>
  );
};

export default ActivationSuccessScreen;
