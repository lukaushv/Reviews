package com.ushver.films;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/films")
@CrossOrigin(origins = "*")
public class FilmController {
    @Autowired
    private FilmService filmService;

    @GetMapping
    public ResponseEntity<List<Film>> getFilms(){
        return new ResponseEntity<List<Film>>(filmService.findAllFilms(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Film>> getSingleFilm(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Film>>(filmService.findMovieByImdbId(imdbId), HttpStatus.OK);
    }
}
