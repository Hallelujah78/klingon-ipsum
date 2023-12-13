import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <section className="section-error">
        <h3 data-testid="error-message" className="error">
          Whoops, something went wrong - hit refresh or try again later...
        </h3>
        <a data-testid="refresh-button" className="btn" href="/">
          Refresh
        </a>
      </section>
    </Wrapper>
  );
};
export default Error;

const Wrapper = styled.div`
  a {
    width: fit-content;
    margin: auto;
  }
`;
