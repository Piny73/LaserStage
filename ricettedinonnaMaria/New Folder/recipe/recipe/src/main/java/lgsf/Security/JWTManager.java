/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lgsf.security;

import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.text.ParseException;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import lgsf.entity.User;

public class JWTManager {

    private static final String PRIVATE_KEY = "/META-INF/private_key.pem";
    private static final String ISS = "lericettedinonnamaria";

    public String generate(User usr) {

        try {
            JSONObject jwt = generateJWT(usr);

            JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                    .keyID(PRIVATE_KEY)
                    .type(JOSEObjectType.JWT)
                    .build();

            JWTClaimsSet claimSet = JWTClaimsSet.parse(jwt);

            SignedJWT signedJWT = new SignedJWT(header, claimSet);

            PrivateKey privateKey = readPrivateKey(PRIVATE_KEY);

            RSASSASigner signer = new RSASSASigner(privateKey);

            signedJWT.sign(signer);

            return signedJWT.serialize();

        } catch (ParseException ex) {
            Logger.getLogger(JWTManager.class.getName()).log(Level.SEVERE, null, ex);
            throw new JwtTokenException("Impossibile generare il JWT token ");
        } catch (Exception ex) {
            Logger.getLogger(JWTManager.class.getName()).log(Level.SEVERE, null, ex);
            throw new JwtTokenException("Impossibile generare il JWT token ");
        }
    }

    private PrivateKey readPrivateKey(String resourceName) throws Exception {
        byte[] byteBuffer = new byte[16384];
        int length = getClass().getResourceAsStream(resourceName)
                .read(byteBuffer);

        String key = new String(byteBuffer, 0, length).replaceAll("-----BEGIN (.*)-----", "")
                .replaceAll("-----END (.*)----", "")
                .replaceAll("\r\n", "")
                .replaceAll("\n", "")
                .trim();

        byte[] decodedKey = Base64.getDecoder().decode(key);
        return KeyFactory.getInstance("RSA")
                .generatePrivate(new PKCS8EncodedKeySpec(decodedKey));
    }

    private JSONObject generateJWT(User usr) {
        long currentTimeInSecs = (System.currentTimeMillis() / 1000);
        long expirationTime = currentTimeInSecs + 1800000;

        JSONObject jwt = new JSONObject();
        jwt.put("iss", ISS);
        jwt.put("iat", currentTimeInSecs);
        jwt.put("auth_time", currentTimeInSecs);
        jwt.put("exp", expirationTime);
        jwt.put("sub", usr.getId().toString());
        jwt.put("upn", usr.getEmail());
        jwt.put("groups", loadGroups(usr));
        return jwt;

    }

    private JSONArray loadGroups(User user) {
        JSONArray result = new JSONArray();
        result.add(user.getRoleuser().toString());
        return result;
    }
}
