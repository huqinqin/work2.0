<template>
<Card>
  <Form :model="formTop" label-position="top">
    <Row :gutter="16">
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Checkbox">
            <CheckboxGroup v-model="formItem.input1">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="DatePicker">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Switch">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Title">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
      </Col>
    </Row>
    <FormItem>
        <Button type="primary">Submit</Button>
        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
    </FormItem>
  </Form>
</Card>
</template>
<script>
export default {
  data () {
    return {
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
      formRight: {
        input1: '',
        input2: '',
        input3: ''
      },
      formTop: {
        input1: '',
        input2: '',
        input3: ''
      },
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    }
  }
}
</script>
