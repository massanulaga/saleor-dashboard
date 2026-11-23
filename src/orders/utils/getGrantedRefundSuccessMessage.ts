import { formatMoney } from "@dashboard/components/Money";
import { type IntlShape } from "react-intl";

import { orderGrantRefundMessages } from "../views/OrderGrantRefund/messages";

type GrantedRefundAmount = {
  amount: number;
  currency: string;
};

interface GrantedRefundSuccessMessageInput {
  orderNumber: string | null | undefined;
  grantedRefundAmount: GrantedRefundAmount | null | undefined;
}

export const getGrantedRefundSuccessMessage = (
  intl: IntlShape,
  { orderNumber, grantedRefundAmount }: GrantedRefundSuccessMessageInput,
): string => {
  if (!grantedRefundAmount) {
    return intl.formatMessage(orderGrantRefundMessages.formSubmitted, { orderNumber });
  }

  return intl.formatMessage(orderGrantRefundMessages.formSubmittedWithAmount, {
    amount: formatMoney(grantedRefundAmount, intl.locale),
    orderNumber,
  });
};
