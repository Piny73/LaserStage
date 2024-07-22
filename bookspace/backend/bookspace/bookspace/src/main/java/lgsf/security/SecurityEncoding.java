/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lgsf.security;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 *
 * @author alfonso
 */
public class SecurityEncoding {

    public static String shaHash(String value) {
        try {
            MessageDigest m = null;
            m = MessageDigest.getInstance("SHA-256");
            byte[] hash = m.digest(value.getBytes("UTF-8"));
            byte[] encodedhash = Base64.getEncoder().encode(hash);
            return new String(encodedhash);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
            throw new IllegalArgumentException("Impossibile codificare in SHA-256", ex);
        }
    }
}
