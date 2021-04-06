import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class CatsReslover {

    @Query(() => String)
    async hello() {
        return 'hello';
    }
    @Query(() => String)
    async Angry() {
        return 'No!!';
    }
}