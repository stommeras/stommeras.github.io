import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmailTemplate({ name, email, message }: ContactEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {name}</Preview>
      <Body style={{ backgroundColor: '#24252a', fontFamily: 'monospace' }}>
        <Container
          style={{
            margin: '32px auto',
            maxWidth: '600px',
            backgroundColor: '#353740',
            padding: '32px',
            borderRadius: '10px',
          }}>
          <Section style={{ marginBottom: '16px' }}>
            <Text style={headerStyles}>From</Text>
            <Text style={textStyles}>
              {name} {'<'}
              <a href={`mailto:${email}`} style={{ color: '#7c88e8', textDecoration: 'none' }}>
                {email}
              </a>
              {'>'}
            </Text>
          </Section>

          <Section>
            <Text style={headerStyles}>Message</Text>
            <Text style={textStyles}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const headerStyles = {
  margin: '0 0 4px',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  color: '#b4b5ba',
  letterSpacing: '0.5px',
} as const;

const textStyles = {
  margin: '0',
  fontSize: '16px',
  color: '#fbfbfb',
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.5',
} as const;
