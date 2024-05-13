import React, { useContext } from "react";
import { Box, VStack, Text, Heading} from "@chakra-ui/react"
import { Language } from '../App'

const About = () => {

	const lan = useContext(Language);

	return (
		lan === "TR" ? 
		<VStack alignItems="left">
			<Text>Hoş geldiniz! Biz Hayaltepe olarak, Fethiye'nin doğal güzelliklerine ve tarihi atmosferine sahip olan Cadianda Antik Kenti'nin yanı başında organik ürünlerin buluşma noktasıyız.</Text>
			<br/>
			<Heading size="md">Doğal Lezzetler: </Heading>
			<Text>Hayaltepe'de, özenle seçilmiş organik ürünlerin zengin bir yelpazesi sizi bekliyor. Kekik, adaçayı, badem gibi doğal lezzetler, titizlikle yetiştirilip işlenerek size sunuluyor.</Text>
			<br/>
			<Heading size="md">Çevre Dostu Üretim: </Heading>
			<Text>Sunduğumuz ürünler sadece sağlıklı değil, aynı zamanda çevreye duyarlı bir üretim anlayışıyla elde ediliyor. Pelet, pelet kedi kumu ve pelet sobası gibi ürünlerimiz, sürdürülebilir kaynaklardan üretiliyor, doğaya saygıyla hazırlanıyor.</Text>
			<br/>
			<Heading size="md">Yaşam Felsefesi: </Heading>
			<Text>Biz Hayaltepe olarak sadece bir alışveriş noktası değil, aynı zamanda sağlıklı ve bilinçli bir yaşam tarzını destekleyen bir topluluk olarak faaliyet gösteriyoruz. Doğanın bize sunduğu nimetlerle uyum içinde yaşamayı ve bu doğallığı paylaşmayı amaçlıyoruz.</Text>
		</VStack> :
		<VStack alignItems="left">
			<Text>Welcome! We, at Hayaltepe, open the doors to a healthy and delicious life with the gifts nature has bestowed upon us. Nestled among the natural beauties of Fethiye, right next to the historically rich Cadianda Ancient City, we proudly stand.</Text>
			<br/>
			<Heading size="md">Natural Flavors: </Heading>
			<Text>At Hayaltepe, a rich selection of carefully curated organic products awaits you. From thyme to sage, almonds, and more, each natural flavor is meticulously cultivated and presented to you with care.</Text>
			<br/>
			<Heading size="md">Environmentally Friendly Production: </Heading>
			<Text>Our products not only promote health but also embrace an environmentally friendly production ethos. Items like pellets, pellet cat litter, and pellet stoves are crafted from sustainable sources, prepared with utmost respect for nature.</Text>
			<br/>
			<Heading size="md">Philosophy of Life: </Heading>
			<Text>At Hayaltepe, we are more than just a shopping destination; we are a community that supports a healthy and conscious way of life. We aim to live in harmony with the gifts nature has given us and share this natural abundance with others.</Text>
		</VStack>
	)
}

export default About