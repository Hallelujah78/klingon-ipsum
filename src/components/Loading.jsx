import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper className="loading-container">
      <div data-testid="loading-spinner" className="loading"></div>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
