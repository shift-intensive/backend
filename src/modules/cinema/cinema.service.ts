import { Injectable } from '@nestjs/common';

import { FILMS, SCHEDULES } from './constants';

@Injectable()
export class CinemaService {
  getFilms() {
    return FILMS;
  }

  getFilm(id: string) {
    const films = this.getFilms();
    return films.find((film) => film.id === id);
  }

  getSchedules() {
    return SCHEDULES;
  }

  getFilmSchedule(filmId: string) {
    const currentDay = new Date().getDay();

    const schedules = this.getSchedules();
    const { schedule } = schedules.find((scheduleDataItem) => scheduleDataItem.filmId === filmId);

    if (currentDay === 0) return schedule;

    return schedule.slice(currentDay, schedule.length).concat(schedule.slice(0, currentDay));
  }
}
