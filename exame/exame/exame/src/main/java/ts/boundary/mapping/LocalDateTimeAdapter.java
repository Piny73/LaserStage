// Percorso suggerito: src/main/java/ts/boundary/mapping/LocalDateTimeAdapter.java
package ts.boundary.mapping;

import javax.json.bind.adapter.JsonbAdapter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeAdapter implements JsonbAdapter<LocalDateTime, String> {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

    @Override
    public String adaptToJson(LocalDateTime dateTime) {
        return dateTime.format(FORMATTER);
    }

    @Override
    public LocalDateTime adaptFromJson(String dateTimeStr) {
        // Rimuove il carattere 'Z' alla fine e converte in LocalDateTime
        return LocalDateTime.parse(dateTimeStr.substring(0, dateTimeStr.length() - 1), FORMATTER);
    }
}
