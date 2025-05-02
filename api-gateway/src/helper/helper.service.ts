import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  /**
   * Parse prisma string argument to a JSON format
   * @param prismaArgs
   * @returns JSON // the argument in a JSON object
   */
  public parsePrismaArgs(prismaArgs: string | undefined): any {
    try {
      let args = {};
      if (prismaArgs) {
        args = JSON.parse(prismaArgs);
      }
      return args;
    } catch (error) {
      throw new BadRequestException(
        `params args must be a strigify JSON format`,
      );
    }
  }
}
