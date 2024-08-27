package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"errors"
	"fmt"
)

func DecryptKey(r1, rand, plain string) string {
	r1MD5 := fmt.Sprintf("%x", md5.Sum([]byte(r1)))
	tempKey := r1MD5[8:24]
	iv := []byte(tempKey)
	randDecrypted, _ := Decrypt(iv, iv, rand)
	r2 := r1 + randDecrypted
	r2MD5 := fmt.Sprintf("%x", md5.Sum([]byte(r2)))
	tempKey2 := r2MD5[8:24]
	key2 := []byte(tempKey2)
	finalKey, _ := Decrypt(key2, iv, plain)
	b, _ := base64.StdEncoding.DecodeString(finalKey)
	return fmt.Sprintf("%x", b)
}

func Decrypt(key, iv []byte, text string) (string, error) {
	decodeData, err := base64.StdEncoding.DecodeString(text)
	if err != nil {
		return "", nil
	}
	//生成密码数据块cipher.Block
	block, _ := aes.NewCipher(key)
	//解密模式
	blockMode := cipher.NewCBCDecrypter(block, iv)
	//输出到[]byte数组
	originData := make([]byte, len(decodeData))
	blockMode.CryptBlocks(originData, decodeData)
	//去除填充,并返回
	return string(unPad(originData)), nil
}

func unPad(ciphertext []byte) []byte {
	length := len(ciphertext)
	fmt.Println(length)
	//去掉最后一次的padding
	unPadding := int(ciphertext[length-1])
	fmt.Println(unPadding)
	return ciphertext[:(length - unPadding)]
}

const (
	PublicKeyStr = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIcLeIt2wmIyXckgNhCGpMTAZyBGO+nk0/IdOrhIdfRR
gBLHdydsftMVPNHrRuPKQNZRslWE1vvgx80w9lCllIUCAwEAAQ==
-----END PUBLIC KEY-----`
)

// EncryptRand Rand 参数加密
func EncryptRand(origData []byte) (string, error) {
	block, _ := pem.Decode([]byte(PublicKeyStr)) //将密钥解析成公钥实例
	if block == nil {
		return "", errors.New("public key error")
	}
	pubInterface, err := x509.ParsePKIXPublicKey(block.Bytes) //解析pem.Decode（）返回的Block指针实例
	if err != nil {
		return "", err
	}
	pub := pubInterface.(*rsa.PublicKey)
	data, err := rsa.EncryptPKCS1v15(rand.Reader, pub, origData) //RSA算法加密
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(data), nil
}

func main() {
	DecryptKey("1ED60E25-E4A5-46BC-8602-F71B69E45D8D", "pffhEj7cwNfIEUxSAZqxbURV36F/GaXEpK8Ki1r6VqA=", "xGurvnomp/jUf7H3qzp3SnyNgQcKFwR4aOapsnHSv88=")
	//fmt.Println(clientRand)
}