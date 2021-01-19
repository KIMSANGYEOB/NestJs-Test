import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './interface/movie.interface';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException(`영화를 찾을 수 없습니다. ID: ${id}`);
    }
    return movie;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, movieData: Movie) {
    this.getOne(id);
    const index = this.movies.findIndex((movie) => movie.id === +id);
    this.movies[index] = { id: +id, ...movieData };
  }

  deleteOne(id: string): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }
}
