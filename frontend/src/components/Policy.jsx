import React, { useContext } from "react";
import { VStack, Text, Heading, UnorderedList, ListItem} from "@chakra-ui/react"
import { Language } from '../App'

const Policy = () => {

	const lan = useContext(Language);

  return(
		lan === "TR" ?
		<VStack alignItems="left">
			<Text>İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) uyarınca, Hayaltepe (“Şirket”) tarafından müşterilerine ait kişisel verilerin işlenmesine ilişkin usul ve esaslara ilişkin olarak veri sahiplerinin aydınlatılması amacı ile kaleme alınmıştır.</Text>
			<br />
			<Heading size="md">1. Kişisel Verilerin İşlenme Amacı</Heading>
			<br />
			<Text>Toplanan kişisel verileriniz, kişisel verilerinizi bizlere açıklamanıza konu olan; Şirket'in ve Şirket'le iş ilişkisi içerisinde olan ilgili kişilerin hukuki, teknik ve ticari-iş güvenliğinin temini; Şirket tarafından sunulan ürün ve hizmetlerin ilgili kişilerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek ilgili kişilere önerilmesi ve tanıtılması için gerekli olan aktivitelerin planlanması ve icrası; Şirket tarafından sunulan ürün ve hizmetlerden ilgili kişileri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması ve ilgili iş süreçlerinin yürütülmesi; Şirket'in ticari ve/veya iş stratejilerinin planlanması ve icrası; Şirket tarafından yürütülen ticari faaliyetlerin gerçekleştirilmesi için ilgili iş birimlerimiz tarafından gerekli çalışmaların yapılması ve buna bağlı iş süreçlerinin yürütülmesi; Şirket'in insan kaynakları politikaları ve süreçlerinin planlanmasının ve icra edilmesi amaçlarıyla 6698 sayılı Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.</Text>
			<br />
			<Heading size="md">2. Kişisel Verilerin Aktarılabileceği Taraflar ve Aktarım Amacı</Heading>
			<br />
			<Text>Müşterilere ilişkin kişisel veriler, Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde, Şirket tarafından sunulan ürün ve hizmetlerin ilgili kişilerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek ilgili kişilere önerilmesi ve tanıtılması için gerekli olan aktivitelerin planlanması ve icrası, Şirket tarafından sunulan ürün ve hizmetlerden ilgili kişileri faydalandırmak için gerekli çalışmaların iş birimleri tarafından yapılması ve ilgili iş süreçlerinin yürütülmesi, Şirket tarafından yürütülen ticari faaliyetlerin gerçekleştirilmesi için ilgili iş birimleri tarafından gerekli çalışmaların yapılması ve buna bağlı iş süreçlerinin yürütülmesi, Şirket'in ticari ve/veya iş stratejilerinin planlanması ve icrası ve Şirket'in ve Şirket'le iş ilişkisi içerisinde olan ilgili kişilerin hukuki, teknik ve ticari-iş güvenliğinin temini amaçları dahilinde Hayaltepe MAKİNA KALIP TASARIM SAN. TİC. LTD. ŞİRKETİ ve Grup Şirketleri, Hayaltepe’nin iş ortakları ve tedarikçileri ile hukuken yetkili kurum ve kuruluşlar ile hukuken yetkili özel hukuk tüzel kişileriyle paylaşılabilecektir.</Text>
			<br />
			<Heading size="md">3. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</Heading>
			<br />
			<Text>Kişisel verileriniz Şirketimiz tarafından farklı kanallarla ve farklı hukuki sebeplere dayanarak; sunduğumuz ürün ile hizmetleri geliştirmek ve ticari faaliyetlerimizi yürütmek amacıyla toplanmaktadır. Bu süreçte kişisel verileriniz; internet sitelerimizdeki bilgi ve talep formları aracılığıyla yahut fiziki ortamda toplanmaktadır. Bu hukuki sebeple toplanan kişisel verileriniz 6698 sayılı Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında işbu Aydınlatma Metni’nin (1) ve (2) maddelerinde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.</Text>
			<br />
			<Heading size="md">4. Veri Sahiplerinin Hakları ve Bu Hakların Kullanılması</Heading>
			<br />
			<Text>6698 Sayılı Kanun kapsamında kişisel verilerinize ilişkin haklarınızı kimliğinizi tevsik edici belgeler ve talebinizi içeren dilekçeniz ile bizzat elden veya noter kanalıyla, veya info@hayaltepe.net e-posta adresimize mail atmak suretiyle iletmeniz durumunda Hayaltepe talebin niteliğine göre talebi en kısa sürede ve en geç otuz gün içinde sonuçlandıracaktır. Taleplere ilişkin olarak herhangi bir ücret talep edilmemesi esas olmakla birlikte, Şirket’in Kişisel Verileri Koruma Kurulu tarafından belirlenen ücret tarifesi üzerinden ücret talep etme hakkı saklıdır. Bu kapsamda Kanun’un 11. maddesi uyarınca kişisel veri sahipleri;</Text>
			<UnorderedList> 
				<ListItem>Kişisel verilerin işlenip işlenmediğini öğrenme,</ListItem>
				<ListItem>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</ListItem>
				<ListItem>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</ListItem>
				<ListItem>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</ListItem>
				<ListItem>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</ListItem>
				<ListItem>Kanun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</ListItem>
				<ListItem>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</ListItem>
				<ListItem>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarına sahiptir.</ListItem>
			</UnorderedList>  
		</VStack> :
		<VStack alignItems="left">
			<Text>This Information Text has been prepared by hayaltepe ("Company") in order to inform data subjects about the principles and procedures regarding the processing of personal data of customers in accordance with the Law on the Protection of Personal Data numbered 6698 ("Law").</Text>
			<br />
			<Heading size="md">1. Purpose of Processing Personal Data</Heading>
			<br />
			<Text>Your collected personal data will be processed in accordance with the conditions and purposes of personal data processing specified in Articles 5 and 6 of Law No. 6698 for the provision of legal, technical, and commercial-business security of the Company and related persons in business relations with the Company; planning and execution of activities necessary for the customization of products and services offered by the Company according to the preferences, usage habits, and needs of related persons, and for their promotion and introduction; conducting necessary studies by our business units to benefit related persons from the products and services offered by the Company and for the execution of related business processes; planning and execution of commercial and/or business strategies of the Company.</Text>
			<br />
			<Heading size="md">2. Parties to Which Personal Data May be Transferred and Purpose of Transfer</Heading>
			<br />
			<Text>Personal data regarding customers may be shared with hayaltepe MAKİNA KALIP TASARIM SAN. TİC. LTD. ŞTİ and Group Companies, business partners and suppliers of hayaltepe, legally authorized institutions and organizations, and legally authorized private legal entities within the framework of the personal data processing conditions and purposes specified in Articles 8 and 9 of the Law for the customization of products and services offered by the Company according to the preferences, usage habits, and needs of related persons, and for their promotion and introduction; conducting necessary studies by our business units to benefit related persons from the products and services offered by the Company and for the execution of related business processes; planning and execution of commercial and/or business strategies of the Company, and for the provision of legal, technical, and commercial-business security of the Company and related persons in business relations with the Company.</Text>
			<br />
			<Heading size="md">3. Method of Collection and Legal Basis for Personal Data Collection</Heading>
			<br />
			<Text>Your personal data is collected by our Company through various channels and based on different legal grounds for the purpose of improving the products and services we offer and conducting our commercial activities. During this process, your personal data is collected through information and request forms on our websites or in physical environments. Personal data collected for this legal reason may also be processed and transferred for the purposes specified in paragraphs (1) and (2) of this Information Text within the scope of the personal data processing conditions and purposes specified in Articles 5 and 6 of Law No. 6698.</Text>
			<br />
			<Heading size="md">4. Rights of Data Subjects and Exercise of These Rights</Heading>
			<br />
			<Text>If you wish to exercise these rights regarding your personal data under Law No. 6698, you can submit your request in person or through a notary with documents verifying your identity and containing your request, or by sending an email to info@hayaltepe.net. hayaltepe will process your request promptly and no later than thirty days, depending on the nature of the request. Although there is no fee for requests, hayaltepe reserves the right to charge a fee based on the fee schedule determined by the Personal Data Protection Board. According to Article 11 of Law No. 6698, data subjects have the following rights:</Text>
			<UnorderedList>
				<ListItem>Learn whether personal data is processed,</ListItem>
				<ListItem>Request information if personal data has been processed,</ListItem>
				<ListItem>Learn the purpose of processing personal data and whether they are used appropriately for their purpose,</ListItem>
				<ListItem>Know the third parties to whom personal data is transferred, whether domestically or abroad,</ListItem>
				<ListItem>Request correction of personal data in case of incomplete or incorrect processing and request notification of the transaction made within this scope to third parties to whom personal data has been transferred,</ListItem>
				<ListItem>Request the deletion or destruction of personal data in case the reasons requiring its processing disappear, despite being processed in accordance with the law and request notification of the transaction made within this scope to third parties to whom personal data has been transferred,</ListItem>
				<ListItem>Object to the occurrence of a result against the person by analyzing the processed data exclusively through automated systems,</ListItem>
				<ListItem>In case of suffering damage due to the processing of personal data unlawfully, request the compensation of the damage.</ListItem>
			</UnorderedList>
		</VStack>
  );
}

export default Policy;