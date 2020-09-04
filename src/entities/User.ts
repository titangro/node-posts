import { Entity, PrimaryKey, Property } from 'mikro-orm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date', default: 'NOW()' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', default: 'NOW()', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text' })
  password!: string;

  // @ManyToOne() // when you provide correct type hint, ORM will read it for you
  // author!: Author;

  // @ManyToOne(() => Publisher) // or you can specify the entity as class reference or string name
  // publisher?: Publisher;

  // @ManyToMany() // owning side can be simple as this!
  // tags = new Collection<BookTag>(this);

  // constructor(title: string, author: Author) {
  //   this.title = title;
  //   this.author = author;
  // }
}
