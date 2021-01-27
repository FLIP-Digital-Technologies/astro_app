import {} from "antd";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { Drawer } from "antd";
import styles from "../styles.module.scss";

// {showAirtime && (
//     <Drawer
//       title="Airtime purchase"
//       width={500}
//       placement="right"
//       closable={false}
//       onClose={() => setShowAirtime(false)}
//       visible={showAirtime}
//     >
//       <AirtimeFlyout state={state} setState={setState} />
//     </Drawer>
//   )}

export const Flyout = ({ state, setState }) => {
  const handelChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <Drawer
      title={state?.title}
      placement="right"
      onClose={state?.close}
      visible={state?.show}
    >
      {state?.inputs.map((item) => {
        switch (item?.type) {
          case "text":
            return (
              <Input
                type={item?.type}
                value={state?.creds[item.name]}
                name={item?.name}
                disabled={item?.disabled}
                onChange={handelChange}
                placeholder={item?.placeholder}
                hint={item?.hint}
                label={item?.label}
              />
            );

          case "select":
            return (
              <Select
                type={item?.type}
                value={state?.creds[item.name]}
                name={item?.name}
                disabled={item?.disabled}
                onChange={handelChange}
                placeholder={item?.placeholder}
                hint={item?.hint}
                options={item?.options || []}
                label={item?.label}
              />
            );
          case "btn":
            return (
              <Button
                type="submit"
                loading={item?.loadiing}
                disabled={item?.disabled}
                form="full"
                className={styles.billsBtnSubmit}
              >
                {item?.value}
              </Button>
            );
          default:
            return null;
        }
      })}
    </Drawer>
  );
};
