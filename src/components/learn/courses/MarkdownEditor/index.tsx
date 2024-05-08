import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

import Markdown from 'react-native-markdown-display';

const copy = `# h1 Heading 8-)

**This is some bold text!**

This is normal text

### Development approach
-  Develop one code base which can be deployed on Android, iOS and Web.

- Divide the project in 4 domains:
  -  Live chat
  -  Posts
  -  Learning
  -  User

`;

const MarkdownDisplay: () => ReactNode = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{ height: '100%' }}
                >
                    <Markdown>
                        {copy}
                    </Markdown>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default MarkdownDisplay;
