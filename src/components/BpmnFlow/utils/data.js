// bpmn 空模板
export const bpmnData1 = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" targetNamespace="http://www.activiti.org/test">
  <process id="customProcess" name="My process" isExecutable="true">
   
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_customProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_customProcess" bpmnElement="customProcess">
     
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

// 开始结束
export const bpmnData2 = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" targetNamespace="http://www.activiti.org/test">
  <process id="customProcess" name="My process" isExecutable="true">
    <startEvent id="start_1634630603052" name="开始" nodeType="start" name="开始">
      <outgoing>Flow_12gpkqq</outgoing>
    </startEvent>
    <endEvent id="end_1634630619871" name="结束" nodeType="end" name="结束">
      <incoming>Flow_12gpkqq</incoming>
    </endEvent>
    <sequenceFlow id="Flow_12gpkqq" sourceRef="start_1634630603052" targetRef="end_1634630619871" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_customProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_customProcess" bpmnElement="customProcess">
      <bpmndi:BPMNEdge id="Flow_12gpkqq_di" bpmnElement="Flow_12gpkqq">
        <di:waypoint x="450" y="102" />
        <di:waypoint x="450" y="288" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1oxzbon_di" bpmnElement="start_1634630603052">
        <omgdc:Bounds x="428" y="58" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="439" y="34" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1jlsg3x_di" bpmnElement="end_1634630619871">
        <omgdc:Bounds x="428" y="288" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="439" y="339" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

// 多个case
export const bpmnData3 = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" targetNamespace="http://www.activiti.org/test">
  <process id="customProcess" name="My process" isExecutable="true">
    <startEvent id="start_1594281588770" name="start" nodeType="start" aaa="1594281588770" name="start">
      <outgoing>Flow_1ise8f3</outgoing>
    </startEvent>
    <intermediateThrowEvent id="service_1594281603000" name="service" nodeType="service" aaa="1594281603000" name="service">
      <incoming>Flow_1ise8f3</incoming>
      <outgoing>Flow_06qlw24</outgoing>
    </intermediateThrowEvent>
    <exclusiveGateway id="case_1594281608356" name="case" nodeType="case" aaa="1594281608356" name="case">
      <incoming>Flow_06qlw24</incoming>
      <outgoing>Flow_135rrzc</outgoing>
      <outgoing>Flow_0erauhs</outgoing>
      <outgoing>Flow_065zvb4</outgoing>
    </exclusiveGateway>
    <intermediateThrowEvent id="service_1594281616400" name="service" nodeType="service" aaa="1594281616400" name="service">
      <incoming>Flow_135rrzc</incoming>
      <outgoing>Flow_0t6zgox</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="method_1594281622331" name="method" nodeType="method" aaa="1594281622331" name="method">
      <incoming>Flow_0t6zgox</incoming>
      <outgoing>Flow_086bfmb</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="service_1594281625566" name="service" nodeType="service" aaa="1594281625566" name="service">
      <incoming>Flow_0erauhs</incoming>
      <outgoing>Flow_1dvp1x7</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="service_1594281629625" name="service" nodeType="service" aaa="1594281629625" name="service">
      <incoming>Flow_086bfmb</incoming>
      <outgoing>Flow_1qyucum</outgoing>
    </intermediateThrowEvent>
    <exclusiveGateway id="case_1594281632719" name="case" nodeType="case" aaa="1594281632719" name="case">
      <incoming>Flow_1qyucum</incoming>
      <incoming>Flow_1dvp1x7</incoming>
      <incoming>Flow_1puiq4r</incoming>
      <outgoing>Flow_00e7oua</outgoing>
    </exclusiveGateway>
    <sequenceFlow id="Flow_1ise8f3" sourceRef="start_1594281588770" targetRef="service_1594281603000" />
    <sequenceFlow id="Flow_06qlw24" sourceRef="service_1594281603000" targetRef="case_1594281608356" />
    <sequenceFlow id="Flow_135rrzc" sourceRef="case_1594281608356" targetRef="service_1594281616400" />
    <sequenceFlow id="Flow_0t6zgox" sourceRef="service_1594281616400" targetRef="method_1594281622331" />
    <sequenceFlow id="Flow_086bfmb" sourceRef="method_1594281622331" targetRef="service_1594281629625" />
    <sequenceFlow id="Flow_1qyucum" sourceRef="service_1594281629625" targetRef="case_1594281632719" />
    <sequenceFlow id="Flow_0erauhs" sourceRef="case_1594281608356" targetRef="service_1594281625566" />
    <sequenceFlow id="Flow_1dvp1x7" sourceRef="service_1594281625566" targetRef="case_1594281632719" />
    <intermediateThrowEvent id="service_1594287674213" name="service" nodeType="service" aaa="1594287674213" name="service">
      <incoming>Flow_00e7oua</incoming>
      <outgoing>Flow_1wj616t</outgoing>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_00e7oua" sourceRef="case_1594281632719" targetRef="service_1594287674213" />
    <exclusiveGateway id="case_1594346520813" name="case" nodeType="case" name="case" aaa="1594346520813">
      <incoming>Flow_065zvb4</incoming>
      <outgoing>Flow_0kt5ja8</outgoing>
      <outgoing>Flow_02ase7x</outgoing>
    </exclusiveGateway>
    <exclusiveGateway id="case_1594346534556" name="case" nodeType="case" name="case" aaa="1594346534556">
      <incoming>Flow_0777hj5</incoming>
      <incoming>Flow_19es60f</incoming>
      <outgoing>Flow_1puiq4r</outgoing>
    </exclusiveGateway>
    <intermediateThrowEvent id="service_1594346539068" name="service" nodeType="service" name="service" aaa="1594346539068">
      <incoming>Flow_0kt5ja8</incoming>
      <outgoing>Flow_0lhv8aj</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="method_1594346543012" name="method" nodeType="method" name="method" aaa="1594346543011">
      <incoming>Flow_0lhv8aj</incoming>
      <outgoing>Flow_19es60f</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="method_1594346559749" name="method" nodeType="method" name="method" aaa="1594346559749">
      <incoming>Flow_02ase7x</incoming>
      <outgoing>Flow_0777hj5</outgoing>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_0kt5ja8" sourceRef="case_1594346520813" targetRef="service_1594346539068" />
    <sequenceFlow id="Flow_065zvb4" sourceRef="case_1594281608356" targetRef="case_1594346520813" />
    <sequenceFlow id="Flow_02ase7x" sourceRef="case_1594346520813" targetRef="method_1594346559749" />
    <sequenceFlow id="Flow_0777hj5" sourceRef="method_1594346559749" targetRef="case_1594346534556" />
    <sequenceFlow id="Flow_0lhv8aj" sourceRef="service_1594346539068" targetRef="method_1594346543012" />
    <sequenceFlow id="Flow_19es60f" sourceRef="method_1594346543012" targetRef="case_1594346534556" />
    <sequenceFlow id="Flow_1puiq4r" sourceRef="case_1594346534556" targetRef="case_1594281632719" />
    <intermediateThrowEvent id="subflow_1594346582529" name="subflow" nodeType="subflow" name="subflow" aaa="1594346582529">
      <incoming>Flow_1wj616t</incoming>
      <outgoing>Flow_1bs29x4</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="service_1594346589542" name="service" nodeType="service" name="service" aaa="1594346589542">
      <incoming>Flow_1bs29x4</incoming>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_1wj616t" sourceRef="service_1594287674213" targetRef="subflow_1594346582529" />
    <sequenceFlow id="Flow_1bs29x4" sourceRef="subflow_1594346582529" targetRef="service_1594346589542" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_customProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_customProcess" bpmnElement="customProcess">
      <bpmndi:BPMNEdge id="Flow_00e7oua_di" bpmnElement="Flow_00e7oua">
        <di:waypoint x="702" y="100" />
        <di:waypoint x="748" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dvp1x7_di" bpmnElement="Flow_1dvp1x7">
        <di:waypoint x="542" y="100" />
        <di:waypoint x="658" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0erauhs_di" bpmnElement="Flow_0erauhs">
        <di:waypoint x="382" y="100" />
        <di:waypoint x="498" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qyucum_di" bpmnElement="Flow_1qyucum">
        <di:waypoint x="622" y="30" />
        <di:waypoint x="680" y="30" />
        <di:waypoint x="680" y="78" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_086bfmb_di" bpmnElement="Flow_086bfmb">
        <di:waypoint x="542" y="30" />
        <di:waypoint x="578" y="30" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t6zgox_di" bpmnElement="Flow_0t6zgox">
        <di:waypoint x="462" y="30" />
        <di:waypoint x="498" y="30" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_135rrzc_di" bpmnElement="Flow_135rrzc">
        <di:waypoint x="360" y="78" />
        <di:waypoint x="360" y="30" />
        <di:waypoint x="418" y="30" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06qlw24_di" bpmnElement="Flow_06qlw24">
        <di:waypoint x="292" y="100" />
        <di:waypoint x="338" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ise8f3_di" bpmnElement="Flow_1ise8f3">
        <di:waypoint x="218" y="100" />
        <di:waypoint x="248" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0kt5ja8_di" bpmnElement="Flow_0kt5ja8">
        <di:waypoint x="382" y="180" />
        <di:waypoint x="418" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_065zvb4_di" bpmnElement="Flow_065zvb4">
        <di:waypoint x="360" y="122" />
        <di:waypoint x="360" y="158" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_02ase7x_di" bpmnElement="Flow_02ase7x">
        <di:waypoint x="360" y="202" />
        <di:waypoint x="360" y="250" />
        <di:waypoint x="498" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0777hj5_di" bpmnElement="Flow_0777hj5">
        <di:waypoint x="542" y="250" />
        <di:waypoint x="680" y="250" />
        <di:waypoint x="680" y="202" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0lhv8aj_di" bpmnElement="Flow_0lhv8aj">
        <di:waypoint x="462" y="180" />
        <di:waypoint x="578" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_19es60f_di" bpmnElement="Flow_19es60f">
        <di:waypoint x="622" y="180" />
        <di:waypoint x="658" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1puiq4r_di" bpmnElement="Flow_1puiq4r">
        <di:waypoint x="680" y="158" />
        <di:waypoint x="680" y="122" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wj616t_di" bpmnElement="Flow_1wj616t">
        <di:waypoint x="770" y="122" />
        <di:waypoint x="770" y="158" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1bs29x4_di" bpmnElement="Flow_1bs29x4">
        <di:waypoint x="770" y="202" />
        <di:waypoint x="770" y="248" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1utv4cp_di" bpmnElement="start_1594281588770">
        <omgdc:Bounds x="182" y="82" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="189" y="125" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_062gum1_di" bpmnElement="service_1594281603000">
        <omgdc:Bounds x="248" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="252" y="125" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0weft7g_di" bpmnElement="case_1594281608356" isMarkerVisible="true">
        <omgdc:Bounds x="338" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="348" y="132" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1a1v6ja_di" bpmnElement="service_1594281616400">
        <omgdc:Bounds x="418" y="8" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="422" y="55" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0bqdgdy_di" bpmnElement="method_1594281622331">
        <omgdc:Bounds x="498" y="8" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="501" y="55" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1do0bir_di" bpmnElement="service_1594281629625">
        <omgdc:Bounds x="578" y="8" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="582" y="55" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_15jd68j_di" bpmnElement="case_1594281632719" isMarkerVisible="true">
        <omgdc:Bounds x="658" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="668" y="132" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1ip6vlw_di" bpmnElement="service_1594287674213">
        <omgdc:Bounds x="748" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="752" y="54" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_11gmmic_di" bpmnElement="case_1594346520813" isMarkerVisible="true">
        <omgdc:Bounds x="338" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="304" y="173" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_03whwtk_di" bpmnElement="case_1594346534556" isMarkerVisible="true">
        <omgdc:Bounds x="658" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="712" y="173" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1m8vo8v_di" bpmnElement="service_1594346539068">
        <omgdc:Bounds x="418" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="422" y="205" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_10whoyh_di" bpmnElement="method_1594346543012">
        <omgdc:Bounds x="578" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="581" y="205" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_000mzk1_di" bpmnElement="service_1594281625566">
        <omgdc:Bounds x="498" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="502" y="125" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1n786pd_di" bpmnElement="method_1594346559749">
        <omgdc:Bounds x="498" y="228" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="501" y="275" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_15zgwb7_di" bpmnElement="subflow_1594346582529">
        <omgdc:Bounds x="748" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="799.5" y="173" width="39" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1upf1m1_di" bpmnElement="service_1594346589542">
        <omgdc:Bounds x="748" y="248" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="752" y="295" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;

// case 与 fork
export const bpmnData4 = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" targetNamespace="http://www.activiti.org/test">
  <process id="customProcess" name="My process" isExecutable="true">
    <startEvent id="start_1594281588770" name="start" nodeType="start" aaa="1594281588770" name="start">
      <outgoing>Flow_1ise8f3</outgoing>
    </startEvent>
    <intermediateThrowEvent id="service_1594281603000" name="service" nodeType="service" aaa="1594281603000" name="service">
      <incoming>Flow_1ise8f3</incoming>
      <outgoing>Flow_06qlw24</outgoing>
    </intermediateThrowEvent>
    <exclusiveGateway id="case_1594281608356" name="case" nodeType="case" aaa="1594281608356" name="case">
      <incoming>Flow_06qlw24</incoming>
      <outgoing>Flow_135rrzc</outgoing>
      <outgoing>Flow_0erauhs</outgoing>
    </exclusiveGateway>
    <intermediateThrowEvent id="service_1594281616400" name="service" nodeType="service" aaa="1594281616400" name="service">
      <incoming>Flow_135rrzc</incoming>
      <outgoing>Flow_0t6zgox</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="method_1594281622331" name="method" nodeType="method" aaa="1594281622331" name="method">
      <incoming>Flow_0t6zgox</incoming>
      <outgoing>Flow_086bfmb</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="service_1594281625566" name="service" nodeType="service" aaa="1594281625566" name="service">
      <incoming>Flow_0erauhs</incoming>
      <outgoing>Flow_1dvp1x7</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="service_1594281629625" name="service" nodeType="service" aaa="1594281629625" name="service">
      <incoming>Flow_086bfmb</incoming>
      <outgoing>Flow_1qyucum</outgoing>
    </intermediateThrowEvent>
    <exclusiveGateway id="case_1594281632719" name="case" nodeType="case" aaa="1594281632719" name="case">
      <incoming>Flow_1qyucum</incoming>
      <incoming>Flow_1dvp1x7</incoming>
      <outgoing>Flow_00e7oua</outgoing>
    </exclusiveGateway>
    <sequenceFlow id="Flow_1ise8f3" sourceRef="start_1594281588770" targetRef="service_1594281603000" />
    <sequenceFlow id="Flow_06qlw24" sourceRef="service_1594281603000" targetRef="case_1594281608356" />
    <sequenceFlow id="Flow_135rrzc" sourceRef="case_1594281608356" targetRef="service_1594281616400" />
    <sequenceFlow id="Flow_0t6zgox" sourceRef="service_1594281616400" targetRef="method_1594281622331" />
    <sequenceFlow id="Flow_086bfmb" sourceRef="method_1594281622331" targetRef="service_1594281629625" />
    <sequenceFlow id="Flow_1qyucum" sourceRef="service_1594281629625" targetRef="case_1594281632719" />
    <sequenceFlow id="Flow_0erauhs" sourceRef="case_1594281608356" targetRef="service_1594281625566" />
    <sequenceFlow id="Flow_1dvp1x7" sourceRef="service_1594281625566" targetRef="case_1594281632719" />
    <intermediateThrowEvent id="service_1594287674213" name="service" nodeType="service" aaa="1594287674213" name="service">
      <incoming>Flow_00e7oua</incoming>
      <outgoing>Flow_1y6vqbl</outgoing>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_00e7oua" sourceRef="case_1594281632719" targetRef="service_1594287674213" />
    <parallelGateway id="fork_1594349039912" name="fork" nodeType="fork" name="fork" aaa="1594349039912">
      <incoming>Flow_1y6vqbl</incoming>
      <outgoing>Flow_0zh8l6b</outgoing>
      <outgoing>Flow_1wy6tch</outgoing>
    </parallelGateway>
    <intermediateThrowEvent id="service_1594349044610" name="service" nodeType="service" name="service" aaa="1594349044610">
      <incoming>Flow_0zh8l6b</incoming>
      <outgoing>Flow_05sqiol</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="method_1594349047069" name="method" nodeType="method" name="method" aaa="1594349047069">
      <incoming>Flow_1wy6tch</incoming>
      <outgoing>Flow_1wi858f</outgoing>
    </intermediateThrowEvent>
    <parallelGateway id="fork_1594349058002" name="fork" nodeType="fork" name="fork" aaa="1594349058002">
      <incoming>Flow_05sqiol</incoming>
      <incoming>Flow_1wi858f</incoming>
      <outgoing>Flow_176yxv3</outgoing>
    </parallelGateway>
    <sequenceFlow id="Flow_1y6vqbl" sourceRef="service_1594287674213" targetRef="fork_1594349039912" />
    <sequenceFlow id="Flow_0zh8l6b" sourceRef="fork_1594349039912" targetRef="service_1594349044610" />
    <sequenceFlow id="Flow_05sqiol" sourceRef="service_1594349044610" targetRef="fork_1594349058002" />
    <sequenceFlow id="Flow_1wy6tch" sourceRef="fork_1594349039912" targetRef="method_1594349047069" />
    <sequenceFlow id="Flow_1wi858f" sourceRef="method_1594349047069" targetRef="fork_1594349058002" />
    <intermediateThrowEvent id="join_1594349098627" name="join" nodeType="join" name="join" aaa="1594349098626">
      <incoming>Flow_176yxv3</incoming>
      <outgoing>Flow_0ya69pr</outgoing>
    </intermediateThrowEvent>
    <intermediateThrowEvent id="subflow_1594349102633" name="subflow" nodeType="subflow" name="subflow" aaa="1594349102633">
      <incoming>Flow_0ya69pr</incoming>
    </intermediateThrowEvent>
    <sequenceFlow id="Flow_176yxv3" sourceRef="fork_1594349058002" targetRef="join_1594349098627" />
    <sequenceFlow id="Flow_0ya69pr" sourceRef="join_1594349098627" targetRef="subflow_1594349102633" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_customProcess">
    <bpmndi:BPMNPlane id="BPMNPlane_customProcess" bpmnElement="customProcess">
      <bpmndi:BPMNEdge id="Flow_00e7oua_di" bpmnElement="Flow_00e7oua">
        <di:waypoint x="702" y="110" />
        <di:waypoint x="748" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dvp1x7_di" bpmnElement="Flow_1dvp1x7">
        <di:waypoint x="462" y="150" />
        <di:waypoint x="680" y="150" />
        <di:waypoint x="680" y="132" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0erauhs_di" bpmnElement="Flow_0erauhs">
        <di:waypoint x="360" y="122" />
        <di:waypoint x="360" y="150" />
        <di:waypoint x="418" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qyucum_di" bpmnElement="Flow_1qyucum">
        <di:waypoint x="622" y="30" />
        <di:waypoint x="680" y="30" />
        <di:waypoint x="680" y="88" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_086bfmb_di" bpmnElement="Flow_086bfmb">
        <di:waypoint x="542" y="30" />
        <di:waypoint x="578" y="30" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t6zgox_di" bpmnElement="Flow_0t6zgox">
        <di:waypoint x="462" y="30" />
        <di:waypoint x="498" y="30" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_135rrzc_di" bpmnElement="Flow_135rrzc">
        <di:waypoint x="360" y="78" />
        <di:waypoint x="360" y="30" />
        <di:waypoint x="418" y="30" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06qlw24_di" bpmnElement="Flow_06qlw24">
        <di:waypoint x="292" y="100" />
        <di:waypoint x="338" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ise8f3_di" bpmnElement="Flow_1ise8f3">
        <di:waypoint x="218" y="100" />
        <di:waypoint x="248" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1y6vqbl_di" bpmnElement="Flow_1y6vqbl">
        <di:waypoint x="792" y="110" />
        <di:waypoint x="848" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zh8l6b_di" bpmnElement="Flow_0zh8l6b">
        <di:waypoint x="870" y="132" />
        <di:waypoint x="870" y="158" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_05sqiol_di" bpmnElement="Flow_05sqiol">
        <di:waypoint x="870" y="202" />
        <di:waypoint x="870" y="248" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wy6tch_di" bpmnElement="Flow_1wy6tch">
        <di:waypoint x="892" y="110" />
        <di:waypoint x="980" y="110" />
        <di:waypoint x="980" y="158" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wi858f_di" bpmnElement="Flow_1wi858f">
        <di:waypoint x="980" y="202" />
        <di:waypoint x="980" y="270" />
        <di:waypoint x="892" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_176yxv3_di" bpmnElement="Flow_176yxv3">
        <di:waypoint x="848" y="270" />
        <di:waypoint x="780" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ya69pr_di" bpmnElement="Flow_0ya69pr">
        <di:waypoint x="740" y="270" />
        <di:waypoint x="652" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1utv4cp_di" bpmnElement="start_1594281588770">
        <omgdc:Bounds x="182" y="82" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="189" y="125" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_062gum1_di" bpmnElement="service_1594281603000">
        <omgdc:Bounds x="248" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="252" y="125" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0weft7g_di" bpmnElement="case_1594281608356" isMarkerVisible="true">
        <omgdc:Bounds x="338" y="78" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="392" y="93" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1a1v6ja_di" bpmnElement="service_1594281616400">
        <omgdc:Bounds x="418" y="8" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="422" y="55" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0bqdgdy_di" bpmnElement="method_1594281622331">
        <omgdc:Bounds x="498" y="8" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="501" y="55" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_000mzk1_di" bpmnElement="service_1594281625566">
        <omgdc:Bounds x="418" y="128" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="422" y="175" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1do0bir_di" bpmnElement="service_1594281629625">
        <omgdc:Bounds x="578" y="8" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="582" y="55" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_15jd68j_di" bpmnElement="case_1594281632719" isMarkerVisible="true">
        <omgdc:Bounds x="658" y="88" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="624" y="103" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1ip6vlw_di" bpmnElement="service_1594287674213">
        <omgdc:Bounds x="748" y="88" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="752" y="135" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1irsr6c_di" bpmnElement="fork_1594349039912">
        <omgdc:Bounds x="848" y="88" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="860" y="64" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_156frpa_di" bpmnElement="service_1594349044610">
        <omgdc:Bounds x="848" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="802" y="173" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0tehyvi_di" bpmnElement="method_1594349047069">
        <omgdc:Bounds x="958" y="158" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="910.5" y="173" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_04dqked_di" bpmnElement="join_1594349098627">
        <omgdc:Bounds x="740" y="250" width="40" height="40" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="751" y="293" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_01szdb6_di" bpmnElement="fork_1594349058002">
        <omgdc:Bounds x="848" y="248" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="860.5" y="302" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_11cizmh_di" bpmnElement="subflow_1594349102633">
        <omgdc:Bounds x="608" y="248" width="44" height="44" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="610" y="295" width="39" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;
