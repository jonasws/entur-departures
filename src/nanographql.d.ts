declare module "nanographql" {
  export type QueryFunction<T> = (variables: T) => string;
  export default function gql<T>(
    strings: TemplateStringsArray
  ): QueryFunction<T>;
}
