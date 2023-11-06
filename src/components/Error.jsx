import styled from "styled-components";

export const Error = () => {
  return (
    <Wrapper>
      <section className="section-error">
        <h3 className="error">
          Whoops, something went wrong - hit refresh or try again later...
        </h3>
        <a className="btn" href="/">
          Refresh
        </a>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  a {
    width: fit-content;
    margin: auto;
  }
`;
