
import { CreateUserInput } from '../../graphql.schema';

export class CreateUserDto extends CreateUserInput {
  name: string;
  email: string;
}
