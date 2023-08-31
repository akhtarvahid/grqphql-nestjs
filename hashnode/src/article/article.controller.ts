import { AuthGuard } from '@app/user/guards/auth.guard';
import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { User } from '@app/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './types/ArticleResponse.interface';

@Controller('articles')
export class ArticleController {

    @Inject() articleService: ArticleService;

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(
        @User() currentUser: UserEntity, 
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.create(currentUser, createArticleDto);
        return this.articleService.buildArticleResponse(article);
    }

    @Get(':slug')
    async getArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponse(article);
    }
}