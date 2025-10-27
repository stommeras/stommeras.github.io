import styled from "styled-components";
import { DecryptedText } from "./DecryptedText";
import { PageContainer, Subtitle } from "./ui";

const TextContainer = styled.p`
  max-width: 800px;
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-align: left;
`;

export const About = () => {
  return (
    <PageContainer>
      <Subtitle>Lorem Ipsum</Subtitle>
      <TextContainer>
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Nisi culpa magna pariatur adipisicing cillum officia duis dolore."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Et enim aute qui minim et. Lorem commodo in est consectetur."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Sit fugiat velit qui officia incididunt sit mollit ullamco laboris."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Aliquip ex culpa id ex esse excepteur quis mollit nostrud aliquip quis aute."
        />
        <DecryptedText
          animateOn="view"
          speed={15}
          maxIterations={1}
          sequential
          text="Dolor sit amet Lorem nostrud velit. Ad dolor est ipsum pariatur voluptate proident culpa tempor laborum occaecat in ipsum."
        />
      </TextContainer>
    </PageContainer>
  );
};
