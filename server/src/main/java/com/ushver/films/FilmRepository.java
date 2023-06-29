package com.ushver.films;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilmRepository extends MongoRepository<Film, ObjectId> {
    Optional<Film> findMovieByImdbId(String imdbId);
}
