export interface GlossaryTerm {
  term: string;
  fullNameEn: string;
  fullNameVi: string;
  category: "ĐIỆN TỬ - BIẾN TẦN" | "NHIỆT LẠNH - MÔI CHẤT" | "THIẾT BỊ - HỆ THỐNG" | "CÔNG CỤ - ĐO KIỂM";
  definition: string;
  fieldApplication: string;
  technicalRule: string;
}

export const HVAC_GLOSSARY: GlossaryTerm[] = [
  {
    term: "EEV",
    fullNameEn: "Electronic Expansion Valve",
    fullNameVi: "Van tiết lưu điện tử",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Van điều tiết lưu lượng môi chất lạnh lỏng phun vào dàn bay hơi bằng động cơ bước (Step Motor) nhận xung từ vi điều khiển vi xử lý.",
    fieldApplication: "Sử dụng trong máy Inverter, Multi, VRV/VRF. Có từ 480 đến 500 bước xung (Pulses). Khi bật nguồn, máy nén phát tiếng gõ 'tạch tạch' khởi động để reset bước xung về 0.",
    technicalRule: "Đo cuộn dây van EEV 5 dây hoặc 6 dây: Điện trở mỗi cuộn xung quanh chân chung thường từ 45Ω - 50Ω (hoặc 150Ω tùy hãng). Các cuộn phải cân bằng tuyệt đối."
  },
  {
    term: "TXV",
    fullNameEn: "Thermostatic Expansion Valve",
    fullNameVi: "Van tiết lưu nhiệt cơ học",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Van tự động điều chỉnh lưu lượng gas lạnh bằng cách cân bằng áp suất giữa bầu cảm nhiệt (Bulb), áp suất bay hơi và lực căng lò xo để duy trì độ quá nhiệt (Superheat) ổn định.",
    fieldApplication: "Lắp đặt trong các hệ thống máy lạnh công nghiệp, kho lạnh thương mại, Chiller, máy đóng gói.",
    technicalRule: "Bầu cảm nhiệt của van TXV phải luôn được kẹp chặt ở vị trí 2 giờ hoặc 10 giờ trên đường ống hút nằm ngang và bọc cách nhiệt kỹ lưỡng, tránh bẫy dầu che khuất."
  },
  {
    term: "IPM",
    fullNameEn: "Intelligent Power Module",
    fullNameVi: "Khối công suất thông minh",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Mô-đun tích hợp chứa 6 bóng bán dẫn công suất cao IGBT cùng mạch driver kích xung, mạch bảo vệ quá dòng, quá nhiệt và bảo vệ sụt áp.",
    fieldApplication: "Trái tim của bo mạch biến tần điều khiển tốc độ quay của động cơ máy nén 3 pha BLDC (DC không chổi than).",
    technicalRule: "Đo kiểm nguội thang Diode VOM: Que đỏ vào cực (-) đo U,V,W được ~0.4V - 0.5V; que đen vào cực (+) đo U,V,W được ~0.4V - 0.5V. Nếu 1 pha có điện trở 0Ω là IPM đã chập."
  },
  {
    term: "IGBT",
    fullNameEn: "Insulated Gate Bipolar Transistor",
    fullNameVi: "Transistor lưỡng cực có cổng cách điện",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Linh kiện bán dẫn kết hợp ưu điểm trở kháng vào cực lớn của MOSFET và khả năng dẫn dòng tải điện áp cao cực lớn của Transistor BJT.",
    fieldApplication: "Sử dụng làm khóa đóng cắt tần số cao (10kHz - 20kHz) băm xung điện áp DC 310V/540V thành sóng hình sin cấp cho lốc Inverter.",
    technicalRule: "Cực Gate (G) cách ly hoàn toàn, cực Collector (C) nối nguồn cao áp và Emitter (E) nối tải hoặc mass. Rất nhạy cảm với tĩnh điện."
  },
  {
    term: "OLP",
    fullNameEn: "Overload Protector",
    fullNameVi: "Rơ-le bảo vệ quá tải nhiệt",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Khí cụ bảo vệ nhiệt sử dụng thanh lưỡng kim bimetal gắn áp sát vỏ hoặc bên trong cuộn dây máy nén, tự động cắt mạch khi dòng điện hoặc nhiệt độ vượt ngưỡng an toàn.",
    fieldApplication: "Bảo vệ máy nén khi bị kẹt cơ khí, sụt áp lưới, thiếu gas làm mát động cơ hoặc tụ điện bị phóng kiệt.",
    technicalRule: "Khi OLP nhảy cắt: Điện trở đo giữa 2 cọc hở mạch (vô cùng ∞). Phải chờ từ 15 đến 30 phút cho lốc nguội xuống thanh lưỡng kim mới tự đóng tiếp điểm lại."
  },
  {
    term: "COP",
    fullNameEn: "Coefficient of Performance",
    fullNameVi: "Hệ số hiệu quả năng lượng làm lạnh",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Tỷ số giữa năng suất lạnh sinh ra chia cho công suất điện tiêu thụ: COP = Q_0 / P_dien.",
    fieldApplication: "Đánh giá mức độ tiết kiệm điện của máy điều hòa và Chiller ở điều kiện tải định mức. Máy dân dụng đạt chuẩn inverter thường có COP từ 3.2 đến 4.5.",
    technicalRule: "COP càng cao máy càng tiết kiệm điện. Hệ thống Chiller ly tâm đệm từ có thể đạt COP > 6.5."
  },
  {
    term: "EER",
    fullNameEn: "Energy Efficiency Ratio",
    fullNameVi: "Tỷ số hiệu quả năng lượng",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Tỷ số giữa công suất làm lạnh (tính bằng BTU/h) chia cho công suất điện tiêu thụ (Watt): EER = BTU / W = 3.412 × COP.",
    fieldApplication: "Nhãn dán năng lượng phổ biến trên máy lạnh bán tại thị trường Việt Nam và Đông Nam Á.",
    technicalRule: "Máy điều hòa có EER > 11.5 BTU/W.h được dán nhãn năng lượng 5 sao theo tiêu chuẩn TCVN."
  },
  {
    term: "SEER",
    fullNameEn: "Seasonal Energy Efficiency Ratio",
    fullNameVi: "Hệ số hiệu suất năng lượng theo mùa",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Đo lường hiệu suất tiết kiệm năng lượng của máy điều hòa biến tần trong suốt một chu kỳ mùa làm mát, tính đến các mức tải biến đổi 25%, 50%, 75% và 100%.",
    fieldApplication: "Tiêu chuẩn quốc tế phản ánh chính xác nhất khả năng tiết kiệm điện thực tế của dòng máy biến tần Inverter.",
    technicalRule: "Chỉ số SEER/CSPF trên nhãn năng lượng Việt Nam: > 5.5 là máy siêu tiết kiệm điện."
  },
  {
    term: "SHF",
    fullNameEn: "Sensible Heat Factor",
    fullNameVi: "Hệ số nhiệt hiện",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Tỷ số giữa lượng nhiệt hiện làm giảm nhiệt độ không khí khô chia cho tổng nhiệt lượng (nhiệt hiện + nhiệt ẩn tách ẩm): SHF = Q_hien / Q_toan_phan.",
    fieldApplication: "Ứng dụng trong đồ thị không khí ẩm (Psychrometric Chart) khi thiết kế dàn lạnh cho phòng máy chủ Server (SHF ~ 0.9 - 0.95 ít tách ẩm) hoặc phòng họp đông người (SHF ~ 0.7 tách ẩm nhiều).",
    technicalRule: "SHF thấp thì dàn lạnh đọng nhiều nước ngưng trên cánh nhôm; SHF cao thì phòng khô ráo thích hợp cho thiết bị điện tử."
  },
  {
    term: "Superheat",
    fullNameEn: "Suction Superheat (SH)",
    fullNameVi: "Độ quá nhiệt hơi hút",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Độ chênh lệch giữa nhiệt độ thực tế đo tại ống đồng hồi về máy nén và nhiệt độ sôi bão hòa tương ứng với áp suất hút: SH = T_ong_hut - T_bao_hoa.",
    fieldApplication: "Chỉ số sống còn để kiểm soát nạp gas và điều chỉnh van tiết lưu.",
    technicalRule: "Tiêu chuẩn van mao/ống cáp: SH = 5°C ~ 7°C. SH < 2°C có nguy cơ ngập dịch lỏng phá vỡ lá van máy nén. SH > 10°C biểu hiện hệ thống thiếu gas."
  },
  {
    term: "Subcooling",
    fullNameEn: "Liquid Subcooling (SC)",
    fullNameVi: "Độ quá lạnh dòng lỏng",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Độ chênh lệch giữa nhiệt độ ngưng tụ bão hòa của dàn nóng và nhiệt độ thực tế đo trên đường ống lỏng sau dàn ngưng: SC = T_ngung - T_ong_long.",
    fieldApplication: "Dùng để đánh giá dàn nóng giải nhiệt có tốt không và xác nhận môi chất đã hóa lỏng 100% trước khi tới van tiết lưu.",
    technicalRule: "Tiêu chuẩn: SC = 3°C ~ 5°C. Nếu SC = 0°C, hơi gas chưa ngưng tụ hết sinh ra bọt khí làm tắc nghẽn van tiết lưu (Flash Gas)."
  },
  {
    term: "Oil Trap",
    fullNameEn: "Oil Trap / P-Trap",
    fullNameVi: "Bẫy dầu chữ P",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Đoạn uốn cong hình chữ P trên đường ống hút bằng đồng, dùng để tích tụ giọt dầu bôi trơn tạo nút thắt thu hẹp tiết diện, tăng vận tốc dòng gas cuốn dầu hồi về cácte máy nén.",
    fieldApplication: "Bắt buộc phải uốn khi dàn nóng đặt cao hơn dàn lạnh từ 3 mét trở lên.",
    technicalRule: "Làm 1 bẫy dầu tại chân ống đứng ngay lối ra của dàn lạnh. Cứ mỗi 5 - 6 mét độ cao của ống đứng tiếp theo phải lắp thêm 1 bẫy dầu phụ."
  },
  {
    term: "AHU",
    fullNameEn: "Air Handling Unit",
    fullNameVi: "Khối xử lý không khí trung tâm",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Thiết bị trao đổi nhiệt lớn dạng hộp chứa quạt ly tâm công suất cao, dàn coil nước lạnh/gas, phin lọc bụi HEPA và bộ sấy để cấp gió tươi điều hòa cho tòa nhà hoặc phòng sạch y tế.",
    fieldApplication: "Hệ thống điều hòa trung tâm Chiller hoặc VRV trong bệnh viện, khách sạn, nhà máy dược phẩm.",
    technicalRule: "Cần bảo trì định kỳ phin lọc thô (Pre-filter) và phin lọc tinh (Medium/HEPA) để tránh tổn thất cột áp quạt làm sụt giảm lưu lượng gió."
  },
  {
    term: "FCU",
    fullNameEn: "Fan Coil Unit",
    fullNameVi: "Khối quạt cuộn trao đổi nhiệt cục bộ",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Thiết bị trao đổi nhiệt cỡ nhỏ gồm quạt lồng sóc và ống đồng lá nhôm dẫn nước lạnh từ Chiller, gắn âm trần nối ống gió hoặc treo tường cho từng phòng riêng lẻ.",
    fieldApplication: "Lắp đặt tại các phòng khách sạn, căn hộ cao cấp hoặc văn phòng làm việc.",
    technicalRule: "Van điều khiển đóng mở nước lạnh FCU thường là van 2 ngả hoặc van 3 ngả tỷ lệ (0-10V) kết nối với cảm biến nhiệt độ phòng Thermostat."
  },
  {
    term: "VRV / VRF",
    fullNameEn: "Variable Refrigerant Volume / Flow",
    fullNameVi: "Hệ thống điều hòa lưu lượng môi chất biến đổi",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Hệ thống điều hòa trung tâm 1 dàn nóng kết nối với hàng chục dàn lạnh thông qua bộ chia ga (Refnet Joint), thay đổi công suất làm lạnh bằng cách điều chỉnh tần số máy nén và độ mở van tiết lưu điện tử EEV.",
    fieldApplication: "VRV là thương hiệu độc quyền của Daikin; VRF là thuật ngữ chung của các hãng khác (Mitsubishi, Toshiba, Panasonic, LG).",
    technicalRule: "Đường ống ga VRV phải được thử kín bằng khí Nitơ khô ở 3 cấp áp suất: 5 bar (5 phút) -> 15 bar (15 phút) -> 38 - 41.5 bar (ngâm 24 giờ)."
  },
  {
    term: "Chiller",
    fullNameEn: "Water Chiller System",
    fullNameVi: "Hệ thống máy làm lạnh nước trung tâm",
    category: "THIẾT BỊ - HỆ THỐNG",
    definition: "Máy sản xuất nước lạnh ở nhiệt độ tiêu chuẩn 7°C (hồi về 12°C) rồi bơm đi khắp tòa nhà cấp cho các AHU và FCU làm mát không khí.",
    fieldApplication: "Trung tâm thương mại, sân bay, nhà xưởng sản xuất lớn và tòa nhà cao ốc chọc trời.",
    technicalRule: "Phân loại theo cơ cấu giải nhiệt: Chiller giải nhiệt gió (Air-cooled) và Chiller giải nhiệt nước dùng Tháp giải nhiệt (Water-cooled Cooling Tower)."
  },
  {
    term: "Modbus RS485",
    fullNameEn: "Modbus Serial RS-485 Communication",
    fullNameVi: "Chuẩn truyền thông công nghiệp nối tiếp RS485",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Giao thức truyền thông nối tiếp vi sai 2 dây (Data+ và Data-) truyền tín hiệu số khoảng cách xa lên đến 1200 mét chống nhiễu cực tốt.",
    fieldApplication: "Kết nối hệ thống điều hòa trung tâm VRV/Chiller với hệ thống quản lý tòa nhà thông minh BMS (Building Management System).",
    technicalRule: "Tại 2 điểm đầu và cuối của đường bus truyền thông RS-485 bắt buộc phải đấu điện trở hồi tiếp đầu cuối (Terminating Resistor) 120Ω để triệt tiêu sóng phản xạ."
  },
  {
    term: "Micron",
    fullNameEn: "Micron of Mercury (μm Hg)",
    fullNameVi: "Đơn vị đo độ sâu chân không Micron",
    category: "CÔNG CỤ - ĐO KIỂM",
    definition: "Đơn vị đo áp suất tuyệt đối siêu mịn dùng đồng hồ điện tử chuyên dụng (1 Micron = 0.001 mmHg = 1/1,000,000 mét thủy ngân).",
    fieldApplication: "Kiểm tra độ sâu chân không và độ ẩm còn sót lại trong đường ống điều hòa trước khi xả gas.",
    technicalRule: "Tiêu chuẩn quốc tế: Hút chân không phải đạt dưới 500 Micron và ngâm (đóng van giữ) trong 10 phút áp suất không được vượt quá 1000 Micron."
  },
  {
    term: "NTC",
    fullNameEn: "Negative Temperature Coefficient",
    fullNameVi: "Điện trở nhiệt hệ số âm",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Cảm biến nhiệt độ bán dẫn có đặc tính: Khi nhiệt độ môi trường TĂNG lên thì giá trị điện trở NTC sẽ GIẢM xuống.",
    fieldApplication: "Được sử dụng làm sensor đồng (sensor cảm biến nhiệt độ ống dàn) và sensor gió (nhiệt độ phòng) trong hầu hết các dòng máy điều hòa.",
    technicalRule: "Sensor điều hòa Daikin ở 25°C là 20kΩ; Panasonic là 15kΩ; Casper/Midea là 5kΩ hoặc 10kΩ. Dùng nước đá 0°C và nước ấm 40°C để kiểm tra đường cong đáp ứng."
  },
  {
    term: "BLDC",
    fullNameEn: "Brushless DC Motor",
    fullNameVi: "Động cơ điện một chiều không chổi than",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Động cơ điện xoay chiều đồng bộ kích từ bằng nam châm vĩnh cửu Neodymium trên Rotor, không dùng cổ góp và chổi than, tuổi thọ cực cao và hiệu suất đạt trên 95%.",
    fieldApplication: "Ứng dụng trong máy nén biến tần và động cơ quạt dàn lạnh/dàn nóng Inverter.",
    technicalRule: "Đo cuộn dây 3 pha U, V, W của động cơ BLDC máy nén: Điện trở 3 cặp cuộn dây U-V, V-W, W-U phải bằng nhau tuyệt đối với sai số dưới 0.1Ω."
  },
  {
    term: "ZCT",
    fullNameEn: "Zero-phase Current Transformer",
    fullNameVi: "Biến dòng thứ tự không",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Biến dòng hình xuyến có cả 2 dây dẫn L (pha) và N (trung tính) cùng xuyên qua tâm lõi từ.",
    fieldApplication: "Bộ phận cảm ứng lõi bên trong Aptomat chống giật (ELCB, RCCB, RCBO) để phát hiện dòng rò vi sai vượt quá 30mA.",
    technicalRule: "Khi hệ thống bình thường: Tổng từ thông do dây L và N sinh ra bằng 0. Khi người bị giật hoặc dây L chạm vỏ rò xuống đất: Dòng lệch sinh từ thông kích rơle nhảy lẫy ngắt trong < 0.03 giây."
  },
  {
    term: "RCBO",
    fullNameEn: "Residual Current Breaker with Overcurrent Protection",
    fullNameVi: "Aptomat chống giật tích hợp bảo vệ quá tải",
    category: "ĐIỆN TỬ - BIẾN TẦN",
    definition: "Thiết bị đóng cắt bảo vệ điện kết hợp 3 chức năng: Chống quá tải nhiệt, chống ngắn mạch hồ quang (như MCB) và chống dòng rò bảo vệ tính mạng con người khỏi bị điện giật (như RCCB).",
    fieldApplication: "Bắt buộc lắp đặt tại nguồn tổng cấp cho máy điều hòa và bình nóng lạnh theo quy chuẩn an toàn QCVN 12:2014/BXD.",
    technicalRule: "Thông số an toàn dân dụng chuẩn: Dòng cắt định mức 16A/20A/25A (đặc tính ngắt Curve C), dòng rò định mức ngắt tức thời IΔn = 30mA."
  },
  {
    term: "POE Oil",
    fullNameEn: "Polyol Ester Oil",
    fullNameVi: "Dầu tổng hợp gốc Polyol Ester",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Dầu bôi trơn tổng hợp nhân tạo chuyên dụng hòa tan tương thích tuyệt đối với các môi chất lạnh nhóm HFC và HFO như R410A, R32, R134a.",
    fieldApplication: "Dầu bôi trơn nạp trong cácte máy nén Inverter và lốc Scroll xoắn ốc đời mới.",
    technicalRule: "Dầu POE có tính hút ẩm (Hygroscopic) cực kỳ mạnh. Tuyệt đối không để hở bình dầu POE ra ngoài không khí quá 10 phút để tránh dầu ngậm nước tạo axit phá hủy cuộn dây motor lốc."
  },
  {
    term: "PAG Oil",
    fullNameEn: "Polyalkylene Glycol Oil",
    fullNameVi: "Dầu tổng hợp gốc Polyalkylene Glycol",
    category: "NHIỆT LẠNH - MÔI CHẤT",
    definition: "Dầu bôi trơn tổng hợp dùng chủ yếu cho hệ thống điều hòa không khí ô tô và xe cơ giới sử dụng môi chất R134a hoặc R1234yf.",
    fieldApplication: "Máy nén điều hòa không khí ô tô dẫn động bằng dây curoa động cơ xe.",
    technicalRule: "Không được dùng dầu PAG cho hệ thống máy lạnh tòa nhà có lốc kín (Hermetic) vì tính dẫn điện của dầu PAG cao hơn dầu POE có thể gây phóng điện qua vỏ."
  }
];
