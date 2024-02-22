import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemberService } from '../service/member.service';
import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Member } from '../entity/member.entity';
import { ApiException } from 'src/common/swagger/api-exception.swagger';

@Controller('members')
@ApiTags('members')
@ApiBearerAuth('access-token')
export class MemberController {
  constructor(private memberService: MemberService) {}

  // Implement your CRUD endpoints here
  @Get()
  @ApiOkResponse({ description: 'Retrieved all members successfully.' })
  async getMembers(): Promise<Member[]> {
    return this.memberService.getMembers();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved member by ID successfully.' })
  @ApiNotFoundResponse({ description: 'Member not found.' })
  async getMemberById(@Param('id') id: string): Promise<Member> {
    const member = await this.memberService.getMemberById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The member has been successfully created.',
  })
  @ApiBody({ type: [CreateMemberDto] })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  createMember(@Body() createMembersDto: CreateMemberDto[]) {
    return this.memberService.createMember(createMembersDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'The member has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'Member not found.' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ApiException,
  })
  async updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.memberService.updateMember(id, updateMemberDto);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The member has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Member not found.' })
  async deleteMember(@Param('id') id: string): Promise<void> {
    return this.memberService.deleteMember(id);
  }

  @Get('/project/:projectId')
  @ApiOkResponse({
    description: 'Retrieved members by projectID successfully.',
  })
  async findMembersByProject(
    @Param('projectId') projectId: string,
  ): Promise<Member[]> {
    return this.memberService.findMembersByProject(projectId);
  }
}
