declare module "nanographql" {
  export default function gql(strings: TemplateStringsArray): (variables: {}) => string;
}
